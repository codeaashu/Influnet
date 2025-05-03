import { useAuth } from "@/hooks/use-auth";
import HeroSection from "./hero-section";
import InfluencerListHome from "./influencer-list-home";
import ManageInfluencerSectionHome from "./manage-influencer-section-home";

const Home = () => {
  return (
    <>
      <HeroSection />
      <InfluencerListHome />
      <ManageInfluencerSectionHome />
    </>
  );
};

export default Home;
