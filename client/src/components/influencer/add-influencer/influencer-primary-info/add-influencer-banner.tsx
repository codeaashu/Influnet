import ImpluencerPlaceholderBanner from "@/assets/images/influencer-placeholder-banner.jpg";

function AddInfluencerBanner() {
  return (
    <div className="relative w-full h-[20vh] md:h-[30vh]">
      <img
        src={ImpluencerPlaceholderBanner}
        className="w-full h-full object-cover"
        alt="influencer banner"
      />
    </div>
  );
}

export default AddInfluencerBanner;
