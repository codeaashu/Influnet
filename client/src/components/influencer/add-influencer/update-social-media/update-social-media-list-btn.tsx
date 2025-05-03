import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useApi } from "@/hooks";
import socialMediaPlatformApiServices from "@/api/endpoints/influencer-social-platforms-api-service";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import influencerSocialPlatformApiService from "@/api/endpoints/influencer-social-platforms-api-service";
import { toast } from "sonner";
import InputFieldError from "@/components/error/input-field-error";
import ToastDescription from "@/components/toast/toast-description";

const platformSchema = z.object({
  platform_id: z.string({ required_error: "Select a platform" }),
  platform_icon_url: z.string(),
  platform_profile_link: z
    .string()
    .url("Profile link must be a valid URL")
    .min(1, "Insert a profile link"),
  follower_count: z
    .number({ invalid_type_error: "Follower count must be a number" })
    .min(1, "Follower count must be added"),
});

function UpdateSocialMediaListBtn({
  influencer,
  influencerSocialPlatforms,
  setInfluencerSocialPlatforms,
}) {
  const [open, setOpen] = useState(false);
  const [platforms, setPlatforms] = useState([]); // the platforms that are stored in the db.
  const nonSelectedPlatforms = platforms.filter(
    (platform) =>
      !influencerSocialPlatforms.some((sp) => sp.platform_id === platform.id)
  );
  const [platformInfo, setPlatformInfo] = useState(null);
  const [profileLink, setProfileLink] = useState("");
  const [followerCount, setFollowerCount] = useState("");
  const [platformErrors, setPlatformErrors] = useState({});

  const {
    request: socialMediaCreateRequest,
    loading: socialMediaCreateLoading,
  } = useApi(influencerSocialPlatformApiService.createPlatform);

  const handleAdd = async () => {
    const newPlatform = {
      platform_id: platformInfo?.id,
      platform_icon_url: platformInfo?.platform_icon_url || "",
      platform_profile_link: profileLink.trim(),
      follower_count: Number(followerCount),
    };

    try {
      // Check is the platform profile link is valid with the selected social platform
      if (
        profileLink &&
        platformInfo &&
        !profileLink.includes(platformInfo.domain_name)
      ) {
        setPlatformErrors((prevError) => ({
          ...prevError,
          platform_profile_link:
            "This link is not valid with the selected platform",
        }));
        return;
      }
      platformSchema.parse(newPlatform); // Validate individual platform

      const { data: socialMediaCreateResponse, error: socialMediaCreateError } =
        await socialMediaCreateRequest(influencer.id, newPlatform);
      console.log(socialMediaCreateError);

      if (socialMediaCreateResponse) {
        const newSocialPlatform = {
          ...socialMediaCreateResponse.influencerSocialPlatform,
          platform: platformInfo,
        };
        const updatedPlatforms = [
          ...influencerSocialPlatforms,
          newSocialPlatform,
        ];
        setInfluencerSocialPlatforms(updatedPlatforms);
        toast.success(socialMediaCreateResponse.message);

        // Reset all
        setPlatformInfo(null);
        setProfileLink("");
        setFollowerCount("");
        setOpen(false);
        setPlatformErrors({});
      } else if (socialMediaCreateError) {
        toast.error(socialMediaCreateError.message, {
          description: (
            <ToastDescription
              description={socialMediaCreateError.description}
            />
          ),
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setPlatformErrors(fieldErrors);
      }
    }
  };

  const { request, loading } = useApi(
    socialMediaPlatformApiServices.getAllSocialMediaPlatforms
  );

  useEffect(() => {
    const loadSocialPlatforms = async () => {
      const { data: socialPlatformsResponse } = await request();
      if (socialPlatformsResponse) {
        setPlatforms(socialPlatformsResponse.socialMediaPlatforms);
      }
    };
    loadSocialPlatforms();
  }, []);

  return (
    <>
      <div
        className="w-full py-5 md:py-0 md:w-full h-full min-h-25 flex flex-col items-center justify-center gap-2 transition duration-300 text-gray-200 hover:text-gray-500 hover:shadow-md rounded-xl border border-gray-200 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Plus className="w-8 h-8" strokeWidth={3} />
        {/* <h1 className="text-md font-semibold">Add New</h1> */}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Social Media</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="">Platform</Label>
              {loading && <div>Platforms loading...</div>}
              {platforms && (
                <Select
                  value={platformInfo}
                  id="platorm"
                  onValueChange={(value) => {
                    setPlatformInfo(value);
                    setPlatformErrors((prev) => ({
                      ...prev,
                      platform_id: undefined,
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null}>Select platform</SelectItem>
                    {nonSelectedPlatforms.map((platform) => (
                      <SelectItem
                        value={platform}
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        <img
                          src={platform.platform_icon_url}
                          className="w-4 h-4"
                          alt=""
                        />
                        {platform.platform_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {platformErrors?.platform_id && (
                <InputFieldError errMessage={platformErrors?.platform_id} />
              )}
            </div>

            <div className="space-y-2">
              <Label>Profile Link</Label>
              <Input
                type="text"
                value={profileLink}
                onChange={(e) => {
                  setProfileLink(e.target.value);
                  setPlatformErrors((prev) => ({
                    ...prev,
                    platform_profile_link: undefined,
                  }));
                }}
                className="text-xs md:text-sm border-none shadow-none bg-gray-100"
              />

              {platformErrors.platform_profile_link && (
                <InputFieldError
                  errMessage={platformErrors.platform_profile_link}
                />
              )}
            </div>

            <div className="space-y-2">
              <Label>Follower Count</Label>
              <Input
                type="number"
                value={followerCount}
                onChange={(e) => {
                  setFollowerCount(e.target.value);
                  setPlatformErrors((prev) => ({
                    ...prev,
                    follower_count: undefined,
                  }));
                }}
                className="text-xs md:text-sm border-none shadow-none bg-gray-100"
              />
              {platformErrors.follower_count && (
                <InputFieldError errMessage={platformErrors.follower_count} />
              )}
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" onClick={handleAdd}>
              {socialMediaCreateLoading ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UpdateSocialMediaListBtn;
