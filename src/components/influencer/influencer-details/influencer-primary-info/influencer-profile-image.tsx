import { ProfileImage } from "@/components/ui/profile-image";

type InfluencerProfileImage = {
  fullname: string;
  profileImageUrl: string;
};

function InfluencerProfileImage({
  profileImageUrl,
  fullname,
}: InfluencerProfileImage) {
  return (
    <div className="absolute -top-26 md:-top-32">
      <ProfileImage
        isInfluencer={true}
        style="w-35 h-35 md:w-45 md:h-45 shadow-2xl"
        fullname={fullname}
        src={profileImageUrl}
        backgroundColor="bg-gray-200"
      />
    </div>
  );
}

export default InfluencerProfileImage;
