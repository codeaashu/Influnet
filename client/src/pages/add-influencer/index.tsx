import { useState } from "react";
import InfluencerManagementWrapper from "@/components/wrappers/influencer-managment-wrapper";
import AddInfluencerBanner from "@/components/influencer/add-influencer/influencer-primary-info/add-influencer-banner";
import AddInfluencerPrimaryInfo from "@/components/influencer/add-influencer/influencer-primary-info/add-influencer-primary-info";
import AddInfluencerCategoryList from "@/components/influencer/add-influencer/influencer-categories/add-influencer-category-list";
import AddInfluencerSocialList from "@/components/influencer/add-influencer/influencer-social-details/add-influencer-social-list";
import { useApi } from "@/hooks";
import influencerApiService from "@/api/endpoints/influencer-api-service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ToastDescription from "@/components/toast/toast-description";

import { z } from "zod";

const influencerSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  handle: z
    .string()
    .min(1, "Handle is required.") // Ensure handle is not empty
    .min(3, "Handle must be at least 3 characters.") // Validate length
    .max(30, "Handle must be no more than 30 characters.") // Validate length
    .regex(/^[a-z0-9_-]+$/, {
      message:
        "Handle can only contain lowercase letters, numbers, underscores (_), and dashes (-).",
    })
    .refine((value) => value.trim() !== "", {
      message: "Handle cannot be empty.",
    })
    .refine((value) => !/^[-_].*|.*[-_]$/.test(value), {
      message: "Handle cannot start or end with a dash (-) or underscore (_).",
    }),
  bio: z
    .string()
    .min(15, "Bio must be at least 15 characters")
    .max(300, "Bio must be at most 300 characters"),
  location: z.string().min(1, "Location is required"),
  profile_image: z.any().refine((file) => file instanceof File, {
    message: "Profile image is required",
  }),
  socialPlatforms: z
    .array(z.any())
    .min(1, "At least one social platform is required"),
  categories: z.array(z.any()).min(1, "At least one category is required"),
});

function AddInfluencerPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    handle: "",
    bio: "",
    location: "",
    profile_image: "",
  });

  const [socialPlatforms, setSocialPlatforms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Update form state
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Live validate this single field against schema
    try {
      influencerSchema.pick({ [name]: true }).parse({ [name]: value });

      // If valid, clear error for this field
      setErrors((prevErrors) => {
        const updated = { ...prevErrors };
        delete updated[name];
        return updated;
      });
    } catch (error) {
      // You could optionally re-validate and set the error here, but it's not needed for "clear-on-valid"
    }
  };

  const { request, loading, errorMessage } = useApi(
    influencerApiService.createInfluencer
  );
  // Handle form submission
  const handleFormSubmit = async () => {
    const toValidate = {
      ...formData,
      socialPlatforms,
      categories,
    };

    const result = influencerSchema.safeParse(toValidate);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    // Add dynamic fields to your object
    formData.socialPlatforms = socialPlatforms;
    formData.categories = categories;

    // Convert the JS object to a FormData instance
    const formDataToSend = new FormData();

    // Loop through the object and append fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "socialPlatforms" || key === "categories") {
        formDataToSend.append(key, JSON.stringify(value));
      } else if (key === "profile_image" && value instanceof File) {
        formDataToSend.append(key, value); // file
      } else if (typeof value !== "undefined" && value !== null) {
        formDataToSend.append(key, value as string);
      }
    });

    // Debug

    const { data: addInfluencerResponse, error: addInfluencerError } =
      await request(formDataToSend);

    if (addInfluencerResponse) {
      toast.success(addInfluencerResponse.message);
      setFormData({
        fullname: "",
        handle: "",
        bio: "",
        location: "",
        profile_image: "",
      });
      setSocialPlatforms([]);
      setCategories([]);
      navigate(`/influencers/${formData.handle}`);
    } else if (addInfluencerError) {
      console.log(addInfluencerError);
      toast.error(addInfluencerError.message, {
        description: (
          <ToastDescription description={addInfluencerError.description} />
        ),
      });
    }
  };

  return (
    <InfluencerManagementWrapper>
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <AddInfluencerBanner addInfluencer={handleFormSubmit} />

          <div className="relative flex gap-3 md:gap-4 w-full p-14 pt-24 rounded-b-2xl">
            <AddInfluencerPrimaryInfo
              influencerPrimaryInfo={formData}
              onInputChange={handleInputChange}
              errors={errors}
            />

            <div className="flex-1 flex flex-col gap-3 md:gap-4 justify-between">
              <div className="flex flex-col gap-3 md:gap-4">
                <AddInfluencerSocialList
                  socialPlatforms={socialPlatforms}
                  setSocialPlatforms={setSocialPlatforms}
                  influencerSchema={influencerSchema}
                  error={errors.socialPlatforms}
                  setErrors={setErrors}
                />
                <AddInfluencerCategoryList
                  categories={categories}
                  setCategories={setCategories}
                  influencerSchema={influencerSchema}
                  error={errors.categories}
                  setErrors={setErrors}
                  style="flex"
                />
              </div>

              <div>
                <Button
                  onClick={handleFormSubmit}
                  className="w-[fit-content] float-end shadow-2xl"
                  disabled={loading}
                >
                  {loading ? "Adding Influencer..." : "Add Influencer"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="w-full flex flex-col md:flex-row gap-3 md:gap-4">
          <div className="w-full md:w-2/3 flex flex-col gap-3 md:gap-4">
            <AddInfluencerSocialList
              socialPlatforms={socialPlatforms}
              setSocialPlatforms={setSocialPlatforms}
            />
          </div>

          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <AddInfluencerCategoryList
              categories={categories}
              setCategories={setCategories}
              style="flex"
            />
          </div>
        </div> */}
      </div>
    </InfluencerManagementWrapper>
  );
}

export default AddInfluencerPage;
