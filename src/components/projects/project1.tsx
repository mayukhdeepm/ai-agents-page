import React, {useEffect} from 'react';
import Footer from "../Footer";
import Hero from "../Hero/Hero";
import VideoCarousel from "../VideoCarousel";
import Section from "../Section";
import Heading from "../../ui/Heading";
import { MouseParallax } from "react-just-parallax";
import { collabApps, collabContent, collabText } from "../../constants";
import { benefits } from "../../constants/index";
import { brainwaveSymbol, check } from "../../assets";
import { LeftCurve, RightCurve } from "../../design/Collaboration";
import { useGSAP } from "@gsap/react";
import { smallSphere, stars } from "../../assets/index.js";
import {
  animateScrollGsap,
  animateTitleScrollGsap,
  animateScrollMultipleGsap,
} from "../../utils/animations";
import Button from "../../ui/Button";
import { cryenx } from "../../assets";
import { hightlightsSlidesProject1 } from "../../constants";
import Benefits from '../Benefits';
import Pricing from '../Pricing';

function Project1() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    animateTitleScrollGsap({
      target: ".collaboration-title",
      animationProps: {
        x: -100,
      },
    });

    animateScrollGsap({
      target: ".button-animated",
      animationProps: {
        scale: 2,
        opacity: 0,
        ease: "power2.in",
      },
    });

    animateScrollMultipleGsap({
      target: ".collaboration-apps",
      animationProps: {
        scale: 1.15,
        opacity: 0,
        ease: "power3.in",
      },
    });

    animateScrollGsap({
      target: ".collaboration-brainwave",
      animationProps: {
        scale: 1.3,
        opacity: 0,
        ease: "power3.in",
        delay: 0.5,
      },
    });

    animateScrollGsap({
      target: ".planets-element",
      animationProps: {
        opacity: 0,
        y: 100,
        ease: "power1.inOut",
        duration: 0.75,
      },
    });
  });

  const project = benefits.find(benefit => benefit.projectName === "cryenx-assistant");

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <>
      <header className="fixed top-0 l-0 w-full z-50 border-b border-n-6 bg-n-8/90 backdrop-blur-sm">
        <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 py-4">
          <a className="block w-[12rem] xl:mr-8" href="https://www.cryenx.com/">
            <img src={cryenx} width={190} height={40} alt="Cryenx Labs" />
          </a>
          <Button href="https://www.cryenx.com/contact">
            Contact us
          </Button>
        </div>
      </header>

      <Hero project={project} />
      <Section crosses id="about">
        <div className="container lg:flex">
          <div className="max-w-[25rem]">
            <div className="">
              <Heading
                className="h2 mb-4 md:mb-8 md:!text-left"
                title={project.title}
              ></Heading>
            </div>
            <ul className="max-w-[25rem] mb-8 lg:mb-14">
              <p className="body-2 mt-3 text-n-4">{project.text}</p>
            </ul>
            {/* <div className="button-animated inline-block">
              <a href="#" className="button">Learn More</a>
            </div> */}
          </div>
          <div className="mt-16 lg:ml-auto xl:w-[38rem] lg:mt-10">
            {/* <div className="relative left-1/2 flex w-[22rem] aspect-square border border-n-6 rounded-full -translate-x-1/2 scale-75 md:scale-100">
              <RightCurve />
            </div> */}
            <div className="hidden relative justify-center mb-[6.5rem] lg:flex ">
          <MouseParallax strength={0.015}>
            <img
              src={smallSphere}
              className="relative z-1 mx-auto"
              width={255}
              height={255}
              alt="Sphere"
            />
          </MouseParallax>

          <div className="absolute top-1/2 left-1/2 w-[40rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <MouseParallax strength={0.06}>
              <img
                src={stars}
                className="w-full"
                width={950}
                height={400}
                alt="Start"
              />
            </MouseParallax>
          </div>
        </div>
          </div>
        </div>
      </Section>
     
      <div className="container mx-auto text-center mt-24 mb-12">
        <h2 className="text-4xl font-bold text-white">How Cryenx Assistant works</h2>
      </div>
      <VideoCarousel projectVideos={hightlightsSlidesProject1} />
      <div className="container mx-auto text-center mt-36">
        <div className="bg-n-7 text-white px-6 py-3 rounded-full inline-block">
          Try out our demo
        </div>
      </div>
      <iframe
        src="https://cryenx-bot.netlify.app/"
        style={{
          minHeight: '900px',
          maxHeight: '1000px',
          width: '100%',
          height: 'auto',
          border: 'none',
          overflow: 'hidden'
        }}
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        title="Responsive Iframe"
      ></iframe>
              <Benefits />
              <Pricing />
      <Footer />
    </>
  );
}

export default Project1;