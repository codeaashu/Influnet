import { Button } from "@/components/ui/button";
import SectionWrappers from "@/components/wrappers/section-wrapper";
import { Link } from "react-router-dom";

function ManageInfluencerSectionHome() {
  return (
    <SectionWrappers style="py-10 md:py-16">
      <div className="flex items-center justify-center flex-col gap-5 md:gap-8 rounded-2xl h-[52vh] md:h-[40vh] p-6 md:p-12 bg-gradient-to-t to-[#ffe6e6] from-white">
        <h1 className="text-center text-[28px] md:text-[45px] font-bold leading-tight">
          Power the Stars. <br />
          <span className="text-primary">Manage the Voices</span> That Matter
        </h1>
        <Link to="/manage-influencers">
          <Button className="md:px-6 md:py-5 md:text-base shadow-xl">
            Manage Influencer
          </Button>
        </Link>
      </div>
    </SectionWrappers>
  );
}

export default ManageInfluencerSectionHome;
