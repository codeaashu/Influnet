import { z } from "zod";

export const socialPlatformSchema = z.object({
  follower_count: z
    .number({ invalid_type_error: "Follower count must be a number" })
    .min(1, "Follower count must be 0 or more"),
  platform_profile_link: z
    .string()
    .min(1, "Profile link is required")
    .url("Profile link must be a valid URL"),
  platform_id: z.string().min(1, "Platform is required"),
});

export const influencerFormSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  handle: z.string().min(1, "Handle is required"),
  bio: z.string().min(20).max(255),
  location: z.string().min(1),
  profile_image: z.instanceof(File),
  socialPlatforms: z
    .array(socialPlatformSchema)
    .nonempty("Add at least one platform"),
});

export type InfluencerFormValues = z.infer<typeof influencerFormSchema>;
