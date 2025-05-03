import SectionWrappers from "@/components/wrappers/section-wrapper";
import HeroImage from "../../assets/images/home-hero-image.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <SectionWrappers style="bg-gradient-to-b to-[#ffe6e6] from-white">
      <div className="w-full h-[92vh] flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
        <div className="w-full md:w-1/2 order-2 md:order-1 flex flex-col items-center md:items-start">
          <h1 className="text-[32px] md:text-[75px] text-center md:text-left font-bold leading-tight">
            <div className="text-primary">Meet Influencers</div>
            <div>in your niche &</div>
            {/* <div>across the world &</div> */}
            <div className="text-primary"> Grow Together</div>
          </h1>
          <Link to="/search">
            <Button className="w-[fit-content] md:px-6 md:py-5 mt-6 md:text-base shadow-xl">
              Meet Influencers
            </Button>
          </Link>
        </div>
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <img src={HeroImage} alt="home hero image" className="w-full" />
        </div>
      </div>
    </SectionWrappers>
  );
}

export default HeroSection;
