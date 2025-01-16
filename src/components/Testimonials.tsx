import React from "react";
import { motion } from "framer-motion";
import { testimonials } from "../constants";

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface TestimonialItem {
  id: string | number;
  text: string;
  name: string;
  username: string;
  src: string;
}

interface TestimonialCardProps {
  item: TestimonialItem;
}

const CustomImage: React.FC<ImageProps> = ({ src, alt, width, height }) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ objectFit: "cover" }}
    />
  );
};

export default function Testimonials() {
  // Split testimonials based on screen size
  const splitTestimonials = () => {
    const length = testimonials.length;
    const desktopChunkSize = Math.ceil(length / 3);
    const tabletChunkSize = Math.ceil(length / 2);
    
    return {
      desktop: [
        testimonials.slice(0, desktopChunkSize),
        testimonials.slice(desktopChunkSize, desktopChunkSize * 2),
        testimonials.slice(desktopChunkSize * 2)
      ],
      tablet: [
        testimonials.slice(0, tabletChunkSize),
        testimonials.slice(tabletChunkSize)
      ],
      mobile: [testimonials]
    };
  };

  const { desktop, tablet, mobile } = splitTestimonials();
  
  return (
    <div className="w-full flex flex-col items-center padding-x py-10 gap-20 bg-[#0E0C15]">
      {/* Mobile View (1 column) */}
      <motion.div className="w-full md:hidden flex gap-5 overflow-hidden h-[750px] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] mt-10">
        <motion.div
          animate={{ y: "-50%" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: 15,
          }}
          className="w-full flex flex-col h-fit"
        >
          {[...mobile[0], ...mobile[0]].map((item: TestimonialItem) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </motion.div>
      </motion.div>

      {/* Tablet View (2 columns) */}
      <motion.div className="hidden md:flex lg:hidden gap-5 overflow-hidden h-[750px] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] mt-10">
        {tablet.map((column, index) => (
          <motion.div
            key={index}
            animate={{ y: "-50%" }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              duration: 15 + index,
            }}
            className="w-1/2 flex flex-col h-fit"
          >
            {[...column, ...column].map((item: TestimonialItem) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </motion.div>
        ))}
      </motion.div>

      {/* Desktop/4K View (3 columns) */}
      <motion.div className="hidden lg:flex gap-5 overflow-hidden h-[750px] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] mt-10">
        {desktop.map((column, index) => (
          <motion.div
            key={index}
            animate={{ y: "-50%" }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              duration: 13 + index,
            }}
            className="w-1/3 flex flex-col h-fit"
          >
            {[...column, ...column].map((item: TestimonialItem) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ item }) => (
  <div className="flex flex-col gap-5">
    <div className="p-10 mb-5 shadow border border-[#15131D]/10 rounded-[30px] bg-[#15131D] flex flex-col gap-5">
      <p className="text-[#FFFFFF] font-dmSans text-xl font-normal leading-tight">
        {item.text}
      </p>
      <div className="flex items-center gap-5">
        <CustomImage
          src={item.src}
          alt={item.name}
          width={60}
          height={60}
        />
        <div className="flex flex-col">
          <h1 className="text-[#FFFFFF] font-dmSans text-xl font-normal leading-tight">
            {item.name}
          </h1>
          <p className="text-[#9793AB] font-dmSans text-xl font-normal leading-tight">
            {item.username}
          </p>
        </div>
      </div>
    </div>
  </div>
);