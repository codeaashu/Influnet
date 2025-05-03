import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Pencil } from "lucide-react";
import InfluencerProfileImage from "./influencer-profile-image";
import { useAuth } from "@/hooks/use-auth";

type Influencer = {
  fullname: string;
  handle: string;
  bio: string;
  location: string;
  profile_image: string;
};

interface InfluencerPrimaryInfoProps {
  influencer: Influencer;
}

function InfluencerPrimaryInfo({
  influencer,
  setIsInfluencerPrimaryInfoFormOpen,
}: InfluencerPrimaryInfoProps) {
  const { user } = useAuth();
  const { user_id, profile_image, fullname, handle, bio, location } =
    influencer;
  const isMe = user?.id == user_id;

  return (
    <div className="relative flex w-full px-5 md:px-16 pt-12 md:pt-18 pb-4 md:pb-6 rounded-b-2xl">
      <InfluencerProfileImage
        profileImageUrl={profile_image}
        fullname={fullname}
      />
      <div className="w-full md:w-2/3">
        <h1 className="text-xl md:text-2xl font-bold">{fullname}</h1>
        <div className="text-sm">
          <p className="text-muted-foreground">@{handle}</p>
          <p className="text-sm md:text-[15px] mt-3">{bio}</p>
          <div className="flex items-center gap-1 mt-3 md:mt-5">
            <MapPin className="w-3 h-3 text-primary" />
            <p className="text-xs text-muted-foreground"> {location}</p>
          </div>
        </div>
      </div>
      {isMe && (
        <Button
          onClick={() => setIsInfluencerPrimaryInfoFormOpen(true)}
          className="absolute right-6 md:right-16 w-10 h-8 flex items-center justify-center text-primary border border-primary bg-white hover:bg-primary  hover:text-white shadow-lg"
        >
          <Pencil className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

export default InfluencerPrimaryInfo;
