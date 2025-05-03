import { useState } from "react";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InputFieldError from "@/components/error/input-field-error";
import AddInfluencerProfileImage from "@/components/influencer/add-influencer/influencer-primary-info/add-influencer-profile-image";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useApi } from "@/hooks";
import influencerApiService from "@/api/endpoints/influencer-api-service";
import influencerManagementApiService from "@/api/endpoints/influencer-management-api-service";
import { toast } from "sonner";

// ✅ Local Schema
const primaryInfoSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  bio: z
    .string()
    .min(15, "Bio must be at least 15 characters")
    .max(300, "Bio must be at most 300 characters"),
  location: z.string().min(1, "Location is required"),
  profile_image: z
    .any()
    .refine((file) => file instanceof File || typeof file === "string", {
      message: "Profile image is required",
    }),
});

// ✅ Types
type Influencer = {
  fullname: string;
  handle: string;
  bio: string;
  location: string;
  profile_image: File | string | null;
};

interface AddInfluencerPrimaryInfoProps {
  initialData: Influencer;
  setIsInfluencerPrimaryInfoFormOpen: (open: boolean) => void;
}

function InfluencerPrimaryInfoForm({
  initialData,
  setInfluencer,
  setIsInfluencerPrimaryInfoFormOpen,
}: AddInfluencerPrimaryInfoProps) {
  const [influencerPrimaryInfo, setInfluencerPrimaryInfo] =
    useState<Influencer>(initialData);
  const initialProfileImage = influencerPrimaryInfo.profile_image;

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { profile_image, fullname, handle, bio, location } =
    influencerPrimaryInfo;

  // Live field validation
  const validateField = (fieldName: keyof Influencer, value: any) => {
    const singleFieldSchema = primaryInfoSchema.shape[fieldName];
    const result = singleFieldSchema.safeParse(value);

    setErrors((prev) => ({
      ...prev,
      [fieldName]: result.success
        ? ""
        : result.error.errors[0]?.message || "Invalid input",
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInfluencerPrimaryInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name as keyof Influencer, value);
  };

  const onImageSelect = (file: File) => {
    setInfluencerPrimaryInfo((prev) => ({
      ...prev,
      profile_image: file,
    }));

    validateField("profile_image", file);
  };

  const { request: updateInfluencerRequest, loading: updatingLoading } = useApi(
    influencerManagementApiService.updateInfluencer
  );
  const handleSaveChanges = async () => {
    const dataToValidate = { ...influencerPrimaryInfo };

    // Only include profile_image if it's a new File
    const isProfileImageUpdated = dataToValidate.profile_image instanceof File;

    if (!isProfileImageUpdated) {
      delete dataToValidate.profile_image;
    }

    const result = primaryInfoSchema
      .partial({ profile_image: true })
      .safeParse(dataToValidate);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      for (const err of result.error.errors) {
        const field = err.path[0] as string;
        if (!formattedErrors[field]) {
          formattedErrors[field] = err.message;
        }
      }
      setErrors(formattedErrors);
    } else {
      setErrors({});

      // Build FormData
      const updateData = influencerPrimaryInfo;
      const formData = new FormData();

      if (updateData.fullname) formData.append("fullname", updateData.fullname);
      if (updateData.bio) formData.append("bio", updateData.bio);
      if (updateData.location) formData.append("location", updateData.location);
      if (updateData.profile_image instanceof File) {
        formData.append("profile_image", updateData.profile_image);
      }

      const { data: influencerUpdateResponse, error: updateInfluencerError } =
        await updateInfluencerRequest(initialData?.id, formData);

      if (influencerUpdateResponse) {
        setInfluencer((prevInfluencer) => ({
          ...prevInfluencer,
          ...influencerUpdateResponse.influencer,
        }));
        // Close the form
        setIsInfluencerPrimaryInfoFormOpen(false);
        toast.success(influencerUpdateResponse.message);
      } else if (updateInfluencerError) {
        toast.error(updateInfluencerError.message);
      }
    }
  };

  return (
    <div className="relative w-full flex flex-col px-5 md:px-16 pt-12 md:pt-18 pb-4 md:pb-6 rounded-b-2xl">
      <AddInfluencerProfileImage
        profile_image={profile_image}
        fullname={fullname}
        onImageSelect={onImageSelect}
      />
      {!!errors.profile_image && (
        <p className="text-xs text-red-500 mt-3">{errors.profile_image}</p>
      )}

      <div className="mt-5 w-2/3">
        <form className="space-y-6 mt-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={handleInputChange}
              className="text-xs md:text-sm border-none shadow-none bg-gray-100"
            />
            {errors.fullname && (
              <InputFieldError errMessage={errors.fullname} />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="handle">Handle</Label>
            <Input
              disabled
              id="handle"
              name="handle"
              value={handle}
              onChange={handleInputChange}
              className="text-xs md:text-sm border-none shadow-none bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={bio}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              className="text-xs md:text-sm border-none shadow-none bg-gray-100"
            />
            {errors.location && (
              <InputFieldError errMessage={errors.location} />
            )}
          </div>
        </form>
      </div>

      <Button
        disabled={updatingLoading}
        onClick={handleSaveChanges}
        className="absolute right-6 md:right-16 flex items-center justify-center shadow-lg"
      >
        <Save className="w-4 h-4" />{" "}
        {updatingLoading ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}

export default InfluencerPrimaryInfoForm;
