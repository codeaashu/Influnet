import influencerSocialPlatformApiService from "@/api/endpoints/influencer-social-platforms-api-service";
import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks";
import { useAuth } from "@/hooks/use-auth";
import formatFollowers from "@/utils/format-follwers";
import { Delete, ExternalLink, Trash2 } from "lucide-react";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type Platform = {
  platform_icon_url: string;
};

type SocialPlatformInfo = {
  follower_count: number;
  platform_profile_link: string;
  platform: Platform;
};

interface InfluencerSocialCardProps {
  socialPlatformInfo: SocialPlatformInfo;
}

function InfluencerSocialCard({
  influencer,
  socialPlatformInfo,
  setInfluencerSocialPlatforms,
}: InfluencerSocialCardProps) {
  const { user } = useAuth();
  const isMe = user?.id == influencer?.id;
  const {
    platform: { platform_icon_url },
    follower_count,
    platform_profile_link,
  } = socialPlatformInfo;

  const {
    request: socialPlatformDeleteRequest,
    loading: socialPlatformDeleteLoading,
  } = useApi(influencerSocialPlatformApiService.deletePlatform);

  const removePlatform = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(influencerId);
    console.log(socialPlatformInfo.id);
    const {
      data: socialPlatformDeleteResponse,
      error: socialPlatformDeleteError,
    } = await socialPlatformDeleteRequest(influencer.id, {
      platform_id: socialPlatformInfo.id,
    });

    if (socialPlatformDeleteResponse) {
      setInfluencerSocialPlatforms((prevPlatforms) =>
        prevPlatforms.filter(
          (platform) => platform.id !== socialPlatformInfo.id
        )
      );
      toast.success(socialPlatformDeleteResponse.message);
    } else if (socialPlatformDeleteError) {
      toast.error(socialPlatformDeleteError.message);
    }
  };
  return (
    <a
      aria-disabled={true}
      href={platform_profile_link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${
        socialPlatformDeleteLoading ? "opacity-50 select-none" : "opacity-100"
      }
      group relative flex items-center p-3 overflow-hidden hover:shadow-md transition duration-300 rounded-xl border border-gray-200 cursor-pointer`}
    >
      {/* <SocialMediaDeleteBtn /> */}
      {isMe && (
        <Trash2
          onClick={removePlatform}
          className={`w-4 h-4 absolute top-2 left-2 md:top-3 md:left-3 opacity-100 transform scale-90 hover:scale-140 text-gray-400 hover:text-red-500 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100`}
        />
      )}

      <ExternalLink className="w-4 h-4 absolute top-2 right-2 md:top-3 md:right-3 opacity-100 md:opacity-0 transform scale-90 hover:scale-140 text-primary transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" />
      <div className="flex-1 p-3 flex justify-center border-r border-gray-200 bg-white transition">
        <img
          src={platform_icon_url}
          alt="LinkedIn"
          className="w-8 md:w-14 h-8 md:h-14 object-contain"
        />
      </div>

      {/* Followers count */}
      <div className="flex-1 p-3 flex flex-row items-center justify-center gap-4">
        <div className="text-center">
          <h1 className="text-md md:text-2xl font-semibold">
            {formatFollowers(follower_count)}
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">Followers</p>
        </div>
      </div>
    </a>
  );
}

export default InfluencerSocialCard;
