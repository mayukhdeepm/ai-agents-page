import brackets from "../assets/svg/Brackets";
import { TaglineProps } from "../lib/types";

function Tagline({ className, children }: TaglineProps) {
  // Returned JSX
  return (
    <div className={`tagline flex items-center ${className || ""}`}>
      {brackets("left")}
      <div className="mx-3 text-n-3">{children}</div>
      {brackets("right")}
    </div>
  );
}

export default Tagline;
