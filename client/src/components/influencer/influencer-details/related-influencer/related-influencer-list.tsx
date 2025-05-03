import ErrorSection from "@/components/error/error-section";
import RelatedInfluencerListSkeleton from "@/components/skeletons/influencer/related-influencer-list-skeleton";
import RelatedInfluencerCard from "./related-influencer-card";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import influencerApiService from "@/api/endpoints/influencer-api-service";
import { useApi } from "@/hooks";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  category_name: string;
  influencer_id: string;
}

interface Influencer {
  id: string;
  fullname: string;
  handle: string;
  profileImage?: string;
  category?: string;
}

interface RelatedInfluencerListProps {
  categories: Category[];
}

function RelatedInfluencerList({
  influencerId,
  categories,
}: RelatedInfluencerListProps) {
  const [influencers, setInfluencers] = useState<Influencer[] | null>(null);
  const { request, loading, errorMessage } = useApi(
    influencerApiService.searchInfluencers
  );
  console.log(influencers);
  const category_names = categories.map((c) => c.category_name).join(",");

  useEffect(() => {
    const loadInfluencers = async () => {
      const { data: influencerResponse } = await request({ category_names });

      if (influencerResponse) {
        const influencersWithoutCurrent =
          influencerResponse.influencers?.filter(
            (influencer) => influencer.id !== influencerId
          );
        console.log(influencersWithoutCurrent);
        setInfluencers(influencersWithoutCurrent);
      }
    };

    loadInfluencers();
  }, [categories]);

  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const navigateToSearchWithCategories = () => {
    searchParams.set("category_names", category_names);
    navigate(`/search?${searchParams.toString()}`, { replace: false });
  };
  return (
    <>
      {loading && <RelatedInfluencerListSkeleton />}

      {errorMessage && (
        <ErrorSection
          sectionHeight="20vh"
          errorHeading="Failed to load related influencers"
          errorMessage={errorMessage}
        />
      )}

      {!loading && influencers?.length > 0 && (
        <div className="p-3 md:p-4 mt-6 md:mt-0 flex flex-col gap-4 border border-gray-200 rounded-xl">
          <p className="text-center mt-1 md:mt-0 md:text-left text-sm font-semibold">
            Influencers in similar categories
          </p>

          <div className="flex flex-col gap-2">
            {influencers.slice(0, 5).map((influencer, idx) => (
              <RelatedInfluencerCard key={idx} influencer={influencer} />
            ))}

            <Button
              variant="outline"
              onClick={navigateToSearchWithCategories}
              className="text-center text-primary text-sm font-semibold shadow-none"
            >
              See All Influencers
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default RelatedInfluencerList;
