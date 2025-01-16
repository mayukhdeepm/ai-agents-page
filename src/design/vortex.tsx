import React, { useEffect, useRef, useMemo } from "react";
import { createNoise3D } from "simplex-noise";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface VortexProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  baseHue?: number;
}

const Vortex: React.FC<VortexProps> = ({
  children,
  className,
  containerClassName,
  particleCount = 2000,
  rangeY = 400,
  baseSpeed = 0.0,
  rangeSpeed = 1.5,
  baseRadius = 1,
  rangeRadius = 2,
  baseHue = 220,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number>();
  const colorTransitionRef = useRef<number>(baseHue);
  const targetColorRef = useRef<number>(baseHue);
  const lastColorChangeRef = useRef<number>(0);
  const particlePropCount = 9;
  const particlePropsLength = particleCount * particlePropCount;
  
  const constants = useMemo(() => ({
    baseTTL: 50,
    rangeTTL: 150,
    rangeHue: 100,
    noiseSteps: 3,
    xOff: 0.00125,
    yOff: 0.00125,
    zOff: 0.0005,
    HALF_PI: 0.5 * Math.PI,
    TAU: 2 * Math.PI,
    TO_RAD: Math.PI / 180,
    COLOR_CHANGE_INTERVAL: 20000, // 20 seconds in milliseconds
    TRANSITION_SPEED: 0.02, // Controls how smooth the color transition is
  }), []);

  const noise3D = useMemo(() => createNoise3D(), []);

  const utils = useMemo(() => ({
    rand: (n: number) => n * Math.random(),
    randRange: (n: number) => n - (n * Math.random() * 2),
    fadeInOut: (t: number, m: number) => {
      const hm = 0.5 * m;
      return Math.abs(((t + hm) % m) - hm) / hm;
    },
    lerp: (n1: number, n2: number, speed: number) => 
      (1 - speed) * n1 + speed * n2,
    getNextColor: () => Math.floor(Math.random() * 360), // Random hue between 0-360
  }), []);

  const initParticle = (
    i: number,
    particleProps: Float32Array,
    canvas: HTMLCanvasElement,
    center: [number, number]
  ): void => {
    const x = utils.rand(canvas.width);
    const y = center[1] + utils.randRange(rangeY);
    
    particleProps.set([
      x,
      y,
      0,
      0,
      0,
      constants.baseTTL + utils.rand(constants.rangeTTL),
      baseSpeed + utils.rand(rangeSpeed),
      baseRadius + utils.rand(rangeRadius),
      colorTransitionRef.current + utils.rand(constants.rangeHue) // Use current transition color
    ], i);
  };

  const drawParticle = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    x2: number,
    y2: number,
    life: number,
    ttl: number,
    radius: number,
    hue: number
  ): void => {
    const alpha = utils.fadeInOut(life, ttl);
    if (alpha < 0.01) return;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `hsla(${hue},100%,60%,${alpha})`;
    ctx.lineWidth = radius;
    ctx.stroke();
  };

  const updateAndDrawParticles = (
    ctx: CanvasRenderingContext2D,
    particleProps: Float32Array,
    canvas: HTMLCanvasElement,
    tick: number,
    center: [number, number],
    currentTime: number
  ): void => {
    // Check if it's time to change color
    if (currentTime - lastColorChangeRef.current >= constants.COLOR_CHANGE_INTERVAL) {
      targetColorRef.current = utils.getNextColor();
      lastColorChangeRef.current = currentTime;
    }

    // Smooth color transition
    colorTransitionRef.current = utils.lerp(
      colorTransitionRef.current,
      targetColorRef.current,
      constants.TRANSITION_SPEED
    );

    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      const i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i,
            i6 = 5 + i, i7 = 6 + i, i8 = 7 + i, i9 = 8 + i;
      
      let x = particleProps[i];
      let y = particleProps[i2];
      
      if (x < -50 || x > canvas.width + 50 || y < -50 || y > canvas.height + 50) {
        initParticle(i, particleProps, canvas, center);
        continue;
      }

      const n = noise3D(
        x * constants.xOff,
        y * constants.yOff,
        tick * constants.zOff
      ) * constants.noiseSteps * constants.TAU;
      
      const vx = utils.lerp(particleProps[i3], Math.cos(n), 0.5);
      const vy = utils.lerp(particleProps[i4], Math.sin(n), 0.5);
      const speed = particleProps[i7];
      const x2 = x + vx * speed;
      const y2 = y + vy * speed;

      // Gradually update particle color during transition
      if (Math.abs(particleProps[i9] - colorTransitionRef.current) > 1) {
        particleProps[i9] = utils.lerp(particleProps[i9], colorTransitionRef.current, 0.1);
      }
      
      drawParticle(
        ctx,
        x, y, x2, y2,
        particleProps[i5],
        particleProps[i6],
        particleProps[i8],
        particleProps[i9]
      );

      particleProps[i] = x2;
      particleProps[i2] = y2;
      particleProps[i3] = vx;
      particleProps[i4] = vy;
      particleProps[i5]++;

      if (particleProps[i5] > particleProps[i6]) {
        initParticle(i, particleProps, canvas, center);
      }
    }
  };

  const draw = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    particleProps: Float32Array,
    tick: number,
    center: [number, number]
  ): void => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";
    updateAndDrawParticles(ctx, particleProps, canvas, tick, center, Date.now());
    
    ctx.globalCompositeOperation = "screen";
    ctx.filter = "blur(8px) brightness(150%)";
    ctx.drawImage(canvas, 0, 0);
    
    ctx.filter = "none";
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      willReadFrequently: false
    });
    if (!ctx) return;

    const center: [number, number] = [0, 0];
    let tick = 0;
    const particleProps = new Float32Array(particlePropsLength);
    
    // Initialize color transition values
    colorTransitionRef.current = baseHue;
    targetColorRef.current = baseHue;
    lastColorChangeRef.current = Date.now();
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      center[0] = 0.5 * canvas.width;
      center[1] = 0.5 * canvas.height;
    };
    resize();

    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i, particleProps, canvas, center);
    }

    const animate = () => {
      tick++;
      draw(canvas, ctx, particleProps, tick, center);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particleCount, constants, utils, noise3D, baseHue]);

  return (
    <div className={cn("relative h-full w-full", containerClassName)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        ref={containerRef}
        className="absolute h-full w-full inset-0 z-0 bg-transparent flex items-center justify-center"
      >
        <canvas ref={canvasRef}></canvas>
      </motion.div>
      <div className={cn("relative z-10", className)}>
        {children}
      </div>
    </div>
  );
};

export default Vortex;