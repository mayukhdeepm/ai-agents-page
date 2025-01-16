import { brainwaveServices, brainwaveServicesIcons } from "../constants";
import Section from "./Section";
import Generating from "../ui/Generating";
import Heading from "../ui/Heading";
import Tagline from "../ui/Tagline"; 
import { RightCurve1 } from "../design/Collaboration";  
import { roadmap_sol } from "../constants";  
import { Link } from 'react-router-dom';

import { service1, service2, service3, check, service4,
  service5,
  service,
  aiw,
  caim } from "../assets";
import {
  PhotoChatMessage,
  Gradient,
  VideoBar,
  VideoChatMessage,
} from "../design/Services";

import { useGSAP } from "@gsap/react";
import {
  animateTitleScrollGsap,
  animateScrollMultipleGsap,
} from "../utils/animations";

function Services() {
  useGSAP(() => {
    animateTitleScrollGsap({ target: ".services-title" });
    animateScrollMultipleGsap({
      target: ".services-element",
      animationProps: {
        opacity: 0,
        y: 100,
        ease: "power2.in",
      },
    });
  });

  return (
    <Section crosses id="solutions">
      <div className="container">
        <div className="services-title">
          <Heading
            title="The Solutions"
            text=""
          />
        </div>
        <div className="relative">
        
        <div className="relative">           
          {roadmap_sol.map((item, index) => {             
            const isStatusDone = item.status === "done";             
            const isEven = index % 2 === 0;              
            const shouldShowCurve = index < 6;
            
            return (               
              <div                 
                key={item.id}                
                className={`flex flex-col md:flex-row bg-[#15131D] p-6 rounded-3xl items-center justify-between mb-10 md:mb-20                    
                  ${isEven ? "md:flex-row" : "md:flex-row-reverse"}                 
                `}               
              >                 
                <div                   
                  className={`w-full md:w-1/2 md:pr-5 md:pr-10                      
                    ${isEven ? "md:ml-10" : ""}                     
                    order-2 md:order-1                   
                  `}                 
                >                   
                  <h4 className="h4 mb-4">{item.title}</h4>                   
                  <p className="body-2 text-n-4 mb-4">{item.text}</p>
                  <Link 
                    to="/projects/cryenx-assistant"
                    className="inline-block px-4 py-2 bg-[#1B1B1B] text-white rounded-lg hover:bg-[#2A2A2A] transition-colors"
                  >
                    Know More
                  </Link>
                </div>                  
                
                <div 
                  className={`                   
                    w-full md:w-1/2 flex justify-center                    
                    order-1 md:order-2                    
                    mb-6 md:mb-0                 
                  `}
                >                   
                  <img                     
                    src={item.imageUrl}                     
                    className="w-full max-w-[480px] h-auto"                     
                    width={300}                     
                    height={300}                     
                    alt={item.title}                   
                  />                 
                </div>                                
              </div>                            
            );           
          })}         
        </div>         
        </div>
      </div>
    </Section>
  );
}

export default Services;