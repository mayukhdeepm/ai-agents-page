import { benefits } from "../constants";
import { Link } from "react-router-dom";

import Section from "./Section";
import Heading from "../ui/Heading";

import Arrow from "../assets/svg/Arrow";
import ClipPath from "../assets/svg/ClipPath";
import { GradientLight } from "../design/Benefits";

function Benefits() {
  return (
    <Section id="work">
      <div className="container relative z-2">
        <div className="benefits-title">
          <Heading
            className="md:max-w-md lg:max-w-2xl"
            title="Featured Work"
          />
        </div>
        <div className="flex flex-wrap gap-10 mb-10">
          {benefits.map((item) => {
            let linkText = "Know More";
            let disabled = false;

            return (
              <div
                className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[25rem] opacity-100 benefits-element group"
                style={{ backgroundImage: `url(${item.backgroundUrl})` }}
                key={item.id}
              >
                <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem]">
                  <h5 className="h5 mb-5">{item.title}</h5>
                  <p className="body-2 mb-6 text-n-3">{item.text}</p>
                  <div className="flex items-center mt-auto">
                    <img
                      src={item.iconUrl}
                      width={48}
                      height={48}
                      alt={item.title}
                    />
                    <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider">
                      <Link
                        to={`/projects/${item.projectName}`}
                        className={`hover:text-n-3 transition-colors ${disabled ? 'cursor-not-allowed' : ''}`}
                        onClick={(e) => disabled && e.preventDefault()}
                      >
                        {linkText}
                      </Link>
                    </p>
                    <Arrow />
                  </div>
                </div>
                {/* Additional lighting effect for some benefit items */}
                {item.light && <GradientLight />}

                <div
                  className="absolute inset-0.5 bg-n-8"
                  style={{ clipPath: "url(#benefits)" }}
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-10">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        width={380}
                        height={362}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
                {/* The path, the div with clipPath style linked to */}
                <ClipPath />
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export default Benefits;