import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Pencil } from "lucide-react";
import AddInfluencerProfileImage from "./add-influencer-profile-image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InputFieldError from "@/components/error/input-field-error";

type Influencer = {
  fullname: string;
  handle: string;
  bio: string;
  location: string;
  profile_image: string;
};

interface AddInfluencerPrimaryInfoProps {
  influencerPrimaryInfo: Influencer;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

function AddInfluencerPrimaryInfo({
  influencerPrimaryInfo,
  onInputChange,
  errors,
}: AddInfluencerPrimaryInfoProps) {
  const { profile_image, fullname, handle, bio, location } =
    influencerPrimaryInfo;

  const onImageSelect = (file) => {
    const profileImage = { target: { name: "profile_image", value: file } };
    console.log(file);
    onInputChange(profileImage);
  };

  return (
    <div className="flex-1">
      <AddInfluencerProfileImage
        profile_image={profile_image}
        fullname={fullname}
        onImageSelect={onImageSelect}
      />
      {errors.profile_image && (
        <p className="text-xs text-red-500">{errors.profile_image}</p>
      )}
      <div className="mt-5">
        {/* <h1 className="text-xl md:text-2xl font-bold">Edit Info</h1> */}
        <form className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={onInputChange}
              className="text-xs md:text-sm border-none shadow-none bg-gray-100"
            />
            {errors.fullname && (
              <InputFieldError errMessage={errors.fullname} />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="handle">Handle</Label>
            <Input
              id="handle"
              name="handle"
              value={handle}
              onChange={onInputChange}
              className="text-xs md:text-sm border-none shadow-none bg-gray-100"
            />
            {errors.handle && <InputFieldError errMessage={errors.handle} />}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={bio}
              onChange={onInputChange}
              className="w-full border text-xs md:text-sm rounded-md resize-none overflow-y-auto max-h-40 border-none shadow-none bg-gray-100"
            />
            {errors.bio && <InputFieldError errMessage={errors.bio} />}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={location}
              onChange={onInputChange}
              className="text-xs md:text-sm border-none shadow-none bg-gray-100"
            />
            {errors.location && (
              <InputFieldError errMessage={errors.location} />
            )}
          </div>

          {/* <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleFormSubmit}
              className="w-24 h-10 bg-primary text-white hover:bg-primary-dark"
            >
              Save
            </Button>
          </div> */}
        </form>
      </div>
      {/* <Button className="absolute right-6 md:right-16 w-10 h-8 flex items-center justify-center text-primary border border-primary bg-white hover:bg-primary hover:text-white shadow-lg">
        <Pencil className="w-4 h-4" />
      </Button> */}
    </div>
  );
}

export default AddInfluencerPrimaryInfo;
