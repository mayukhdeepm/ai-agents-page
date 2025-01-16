import { MouseParallax } from "react-just-parallax";

import { collabApps, collabContent, collabText } from "../constants";

import Section from "./Section";
import Button from "../ui/Button";
import Heading from "../ui/Heading";

import { brainwaveSymbol, check } from "../assets";
import { LeftCurve, RightCurve } from "../design/Collaboration";
import { useGSAP } from "@gsap/react";
import {
  animateScrollGsap,
  animateTitleScrollGsap,
  animateScrollMultipleGsap,
} from "../utils/animations";

function Collaboration() {
  useGSAP(() => {
    // Animation for the title
    animateTitleScrollGsap({
      target: ".collaboration-title",
      animationProps: {
        x: -100,
      },
    });

    // Animation for CTA button
    animateScrollGsap({
      target: ".button-animated",
      animationProps: {
        scale: 2,
        opacity: 0,
        ease: "power2.in",
      },
    });

    // Animation for app logos
    animateScrollMultipleGsap({
      target: ".collaboration-apps",
      animationProps: {
        scale: 1.15,
        opacity: 0,
        ease: "power3.in",
      },
    });

    // Animation for Brainwave logo
    animateScrollGsap({
      target: ".collaboration-brainwave",
      animationProps: {
        scale: 1.3,
        opacity: 0,
        ease: "power3.in",
        delay: 0.5,
      },
    });
  });

  // Returned JSX
  return (
    <Section crosses id="about">
      <div className="container lg:flex">
        <div className="max-w-[25rem]">
          <div className="">
            <Heading
              className="h2 mb-4 md:mb-8 md:!text-left"
              title="About Us"
            ></Heading>
          </div>
          <ul className="max-w-[25rem] mb-8 lg:mb-14">
          <p className="body-2 mt-3 text-n-4">We’re not just another AI company—we’re your partner in innovation and growth. At Cryenx Labs, we specialize in crafting cutting-edge AI solutions designed to help ambitious brands achieve measurable, ROI-driven results.
          </p>
          <p className="body-2 mt-3 text-n-4">Our team of AI experts, creative problem-solvers, and tech innovators builds bespoke solutions tailored to your goals, ensuring every tool we deliver drives tangible outcomes. From helping clients generate millions in revenue to cutting operational costs and creating new opportunities, we focus on what matters most: your success.
          </p>
          <p className="body-2 mt-3 text-n-4">What sets us apart? Our commitment to making AI work for you—enhancing human creativity, optimizing decision-making, and empowering your team with solutions that deliver. Together, we shape the future of your business in a world that’s changing faster than ever.

</p>
            {/* {collabContent.map((item) => (
              <li key={item.id} className="mb-3 py-3">
                {item.text && (
                  <p className="body-2 mt-3 text-n-4">{item.text}</p>
                )}
              </li>
            ))} */}
          </ul>
          <div className=" inline-block">
            <Button href="https://www.cryenx.com/contact">Let's Connect</Button>
          </div>
        </div>
        {/* Apps circle */}
        <div className="mt-16 lg:ml-auto xl:w-[38rem] lg:mt-32">
          {/* <p className="body-2 mb-4 text-n-4 md:mb-16 lg:mb-32 lg:w-[22rem] lg:mx-auto">
            {collabText}
          </p> */}
          <div className="relative left-1/2 flex w-[22rem] aspect-square border border-n-6 rounded-full -translate-x-1/2 scale-75 md:scale-100">
            <MouseParallax strength={0.025} isAbsolutelyPositioned>
              <div className="flex w-60 aspect-square border border-n-6 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                <div className="w-[6rem] aspect-square m-auto p-[0.2rem] bg-conic-gradient rounded-full">
                  <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
                    <img
                      src={brainwaveSymbol}
                      width={48}
                      height={48}
                      alt="Brainwave"
                    />
                  </div>
                </div>
              </div>
            </MouseParallax>

            {/* App Icons */}
            <MouseParallax strength={0.01}>
              <ul>
                {collabApps.map((app, i) => (
                  <li
                    key={app.id}
                    className={`absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom rotate-${i * 45} `}
                  >
                    <div
                      className={`relative -top-[1.6rem] flex w-[3.2rem] h-[3.2rem] bg-n-7 border border-n-1/15 rounded-xl -rotate-${i * 45}`}
                    >
                      <img
                        src={app.icon}
                        className="m-auto"
                        width={app.width}
                        height={app.height}
                        alt={app.title}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </MouseParallax>

            {/* <LeftCurve /> */}
            <RightCurve />
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Collaboration;
