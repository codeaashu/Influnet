import InfluencerBanner from "@/components/influencer/influencer-details/influencer-primary-info/influencer-banner";
import InfluencerSocialList from "@/components/influencer/influencer-details/influencer-social-details/influencer-social-list";
import SectionWrappers from "@/components/wrappers/section-wrapper";
import InfluencerPrimaryInfo from "@/components/influencer/influencer-details/influencer-primary-info/influencer-primary-info";
import InfluencerReviewsContainer from "@/components/influencer/influencer-details/influencer-review/influencer-reviews-container";
import InfluencerCategoryList from "@/components/influencer/influencer-details/influencer-categories/influencer-category-list";
import RelatedInfluencerList from "@/components/influencer/influencer-details/related-influencer/related-influencer-list";
import { useApi } from "@/hooks";
import influencerApiService from "@/api/endpoints/influencer-api-service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfluencerDetailsSkeleton from "@/components/skeletons/influencer/influencer-details-skeleton";
import ErrorSection from "@/components/error/error-section";
import InfluencerPrimaryInfoForm from "@/components/forms/influencer/influencer-primary-info-form";

function InfluencerDetailsPage() {
  const [isInfluencerPrimaryInfoFormOpen, setIsInfluencerPrimaryInfoFormOpen] =
    useState(false);
  const { handle } = useParams();
  const [influencer, setInfluencer] = useState(null);
  const { request, loading, errorMessage } = useApi(
    influencerApiService.getInfluencerByHandle
  );

  useEffect(() => {
    if (!handle) return;
    const loadInfluencer = async () => {
      const { data } = await request(handle);
      if (data) setInfluencer(data.influencer);
    };

    loadInfluencer();
  }, [handle]);

  return (
    <SectionWrappers style="pt-2 md:pt-6">
      {/* Loading State */}
      {loading && <InfluencerDetailsSkeleton />}

      {/* Error State */}
      {!loading && errorMessage && (
        <ErrorSection
          errorHeading="Failed to load influencer details."
          errorMessage={errorMessage}
        />
      )}

      {/* Content */}
      {!loading && influencer && (
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <InfluencerBanner />

            {/* Influencer primary info section */}
            {!isInfluencerPrimaryInfoFormOpen ? (
              <InfluencerPrimaryInfo
                influencer={influencer}
                setIsInfluencerPrimaryInfoFormOpen={
                  setIsInfluencerPrimaryInfoFormOpen
                }
              />
            ) : (
              <InfluencerPrimaryInfoForm
                initialData={influencer}
                setInfluencer={setInfluencer}
                errors={{}}
                setIsInfluencerPrimaryInfoFormOpen={
                  setIsInfluencerPrimaryInfoFormOpen
                }
              />
            )}
          </div>

          <div className="w-full flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="w-full md:w-2/3 flex flex-col gap-3 md:gap-4">
              <InfluencerSocialList influencer={influencer} />
              <InfluencerCategoryList
                style="flex md:hidden"
                influencer={influencer}
                setInfluencer={setInfluencer}
              />
              <InfluencerReviewsContainer
                reviews={influencer.reviews}
                influencer={influencer}
              />
            </div>

            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <InfluencerCategoryList
                style="hidden md:flex"
                influencer={influencer}
                setInfluencer={setInfluencer}
              />
              <RelatedInfluencerList
                influencerId={influencer.id}
                categories={influencer.categories}
              />
            </div>
          </div>
        </div>
      )}
    </SectionWrappers>
  );
}

export default InfluencerDetailsPage;
