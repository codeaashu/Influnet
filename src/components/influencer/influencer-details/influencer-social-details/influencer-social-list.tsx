import { useState } from "react";
import AddSocialMediaCard from "./add-social-media-card";
import InfluencerSocialCard from "./influencer-social-card";
import UpdateSocialMediaListBtn from "../../add-influencer/update-social-media/update-social-media-list-btn";
import { useAuth } from "@/hooks/use-auth";

type SocialPlatform = {
  platform_icon_url: string;
};

type SocialPlatformList = {
  follower_count: number;
  platform_profile_link: string;
  platform: SocialPlatform;
}[];

interface InfluencerSocialListProps {
  socialPlatformList: SocialPlatformList;
}

function InfluencerSocialList({ influencer }: InfluencerSocialListProps) {
  const { user } = useAuth();
  const isMe = user?.id == influencer.user_id;

  const [influencerSocialPlatforms, setInfluencerSocialPlatforms] = useState(
    influencer.socialPlatforms
  );
  return (
    <div className="h-[fit-content] grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
      {influencerSocialPlatforms.map((socialPlatformInfo, index) => (
        <InfluencerSocialCard
          key={index}
          influencerId={influencer.id}
          socialPlatformInfo={socialPlatformInfo}
          setInfluencerSocialPlatforms={setInfluencerSocialPlatforms}
        />
      ))}
      {isMe && (
        <UpdateSocialMediaListBtn
          influencer={influencer}
          influencerSocialPlatforms={influencerSocialPlatforms}
          setInfluencerSocialPlatforms={setInfluencerSocialPlatforms}
        />
      )}
    </div>
  );
}

export default InfluencerSocialList;
