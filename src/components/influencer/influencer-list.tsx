// components/influencer/influencer-list.tsx or similar

import InfluencerCard from "./card/influencer-card";

type SocialMediaPlatform = {
  platform_name: string;
  platform_icon_url: string;
};

type influencerSocialPlatformInfo = {
  platform_profile_link: string;
  follower_count: number;
  platform: SocialMediaPlatform;
};

type Category = {
  category_name: string;
};

type Influencer = {
  fullname: string;
  handle: string;
  profile_image?: string;
  avg_review_score: number;
  socialPlatforms: influencerSocialPlatformInfo[];
  categories: Category[];
};

type InfluencerListProps = {
  influencers: Influencer[];
};

function InfluencerList({ influencers }: InfluencerListProps) {
  return (
    <div className="min-h-[65vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
      {influencers.map((influencer) => (
        <InfluencerCard
          key={influencer.handle}
          fullname={influencer.fullname}
          handle={influencer.handle}
          avg_review_score={influencer.avg_review_score}
          profile_image={influencer.profile_image}
          socialPlatforms={influencer.socialPlatforms}
          categories={influencer.categories.slice(0, 3)}
        />
      ))}
    </div>
  );
}

export default InfluencerList;
