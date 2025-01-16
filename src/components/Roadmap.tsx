// import { roadmap } from "../constants";

// import Section from "./Section";
// import Button from "../ui/Button";
// import Heading from "../ui/Heading";
// import Tagline from "../ui/Tagline";

// import { check2, grid, loading1 } from "../assets";

// import { useGSAP } from "@gsap/react";
// import {
//   animateScrollMultipleGsap,
//   animateTitleScrollGsap,
// } from "../utils/animations";

// function Roadmap() {
//   useGSAP(() => {
//     // Animation for the title
//     animateTitleScrollGsap({ target: ".roadmap-title" });

//     // Animation for benefits elements
//     animateScrollMultipleGsap({
//       target: ".roadmap-element",
//       animationProps: {
//         opacity: 0,
//         scale: 0.75,
//         ease: "power1.inOut",
//         duration: 0.75,
//       },
//     });
//   });

//   // Returned JSX
//   return (
//     <Section className="overflow-hidden" id="roadmap">
//       <div className="container md:pb-10">
//         <div className="roadmap-title">
//           <Heading title="The Process" tag="Ready to get started" />
//         </div>
//         <div className="relative grid gap-6 md:grid-cols-2 md:gap-4 md:pb-[7rem]">
//           {roadmap.map((item) => {
//             // Setting the status const of the item
//             const isStatusDone = item.status === "done";

//             // Returned JSX
//             return (
//               <div
//                 key={item.id}
//                 className={`md:flex even:md:translate-y-[7rem] p-0.25 rounded-[2.5rem] ${item.colorful ? "bg-conic-gradient" : "bg-n-6"} roadmap-element`}
//               >
//                 <div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">
//                   <div className="absolute top-0 left-0 max-w-4">
//                     <img
//                       src={grid}
//                       className="w-full"
//                       width={550}
//                       height={550}
//                       alt="Grid"
//                     />
//                   </div>
//                   <div className="relative z-1">
//                     <div className="flex items-center justify-between mb-8 max-[430px]:flex-col max-[430px]:gap-3 max-[430px]:items-start">
//                       <Tagline>{item.date}</Tagline>
//                       <div className="flex items-center px-4 py-1 bg-n-1 rounded text-n-8">
//                         <img
//                           src={isStatusDone ? check2 : loading1}
//                           className={`mr-2.5 ${!isStatusDone && "animate-[spin_2000ms_linear_infinite]"}`}
//                           width={16}
//                           height={16}
//                           alt="Status"
//                         />
//                         <div className="tagline">{item.status}</div>
//                       </div>
//                     </div>
//                     <div className="mb-10 -mx-15">
//                       <img
//                         src={item.imageUrl}
//                         className="w-full"
//                         width={630}
//                         height={420}
//                         alt={item.title}
//                       />
//                     </div>
//                     <h4 className="h4 mb-4">{item.title}</h4>
//                     <p className="body-2 text-n-4">{item.text}</p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         <div className="flex justify-center mt-12 md:mt-15 xl:mt-20">
//           <Button href="#roadmap">Our Process</Button>
//         </div>
//       </div>
//     </Section>
//   );
// }

// export default Roadmap;
// Roadmap;

import { roadmap } from "../constants";  
import Section from "./Section"; 
import Button from "../ui/Button"; 
import Heading from "../ui/Heading"; 
import Tagline from "../ui/Tagline"; 
import { RightCurve1 } from "../design/Collaboration";  
import { useGSAP } from "@gsap/react"; 
import {   
  animateScrollMultipleGsap,   
  animateTitleScrollGsap, 
} from "../utils/animations";  

function Roadmap() {   
  useGSAP(() => {     
    // Animation for the title     
    animateTitleScrollGsap({ target: ".roadmap-title" });      
    
    // Animation for benefits elements     
    animateScrollMultipleGsap({       
      target: ".roadmap-step",       
      animationProps: {         
        opacity: 0,         
        x: 50,         
        ease: "power1.inOut",         
        duration: 0.75,       
      },     
    });   
  });    

  // Returned JSX   
  return (     
    <Section className="overflow-hidden" id="process">       
      <div className="container md:pb-10">         
        <div className=" text-center mb-10">           
          <Heading title="The Process" tag="Ready to get started" />         
        </div>         
        <div className="relative">           
          {roadmap.map((item, index) => {             
            // Setting the status of the item             
            const isStatusDone = item.status === "done";             
            const isEven = index % 2 === 0;              
            
            // Only render RightCurve1 for the first 4 items
            const shouldShowCurve = index < 6;
            
            // Returned JSX             
            return (               
              <div                 
                key={item.id}                
                className={` flex flex-col md:flex-row items-center justify-between mb-10 md:mb-20                    
                  ${isEven ? "md:flex-row" : "md:flex-row-reverse"}                 
                `}               
              >                 
                <div                   
                  className={`w-full md:w-1/2 md:pr-5 md:pr-10                      
                    ${isEven ? "md:ml-10" : ""}                     
                    order-2 md:order-1                   
                  `}                 
                >                   
                  <div className="mb-4">                     
                    <Tagline>{item.date}</Tagline>                   
                  </div>                   
                  <h4 className="h4 mb-4">{item.title}</h4>                   
                  <h6 className="h6 mb-4">{item.text1}</h6>                   
                  <p className="body-2 text-n-4 mb-4">{item.text}</p>                   
                  {shouldShowCurve && <RightCurve1 isFlipped={!isEven} />}                 
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
        {/* <div className="flex justify-center mt-12 md:mt-15 xl:mt-20">           
          <Button href="#process">Our Process</Button>         
        </div>        */}
      </div>     
    </Section>   
  ); 
}    

export default Roadmap;