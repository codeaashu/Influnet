import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce"; // <-- Add this package
import influencerApiService from "@/api/endpoints/influencer-api-service";
import ErrorSection from "@/components/error/error-section";
import InfluencerList from "@/components/influencer/influencer-list";
import InfluencerFilterSection from "@/components/search/filters/influencer-filter-section";
import InfluencerListSkeleton from "@/components/skeletons/influencer/influencer-list-skeleton";
import SectionWrappers from "@/components/wrappers/section-wrapper";
import { useApi } from "@/hooks";

function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [influencers, setInfluencers] = useState(null);

  const debouncedParamsString = useDebounce(params.toString(), 1000); // ⏳ debounce 300ms
  const isStale = params.toString() !== debouncedParamsString[0];

  const { request, loading, error } = useApi(
    influencerApiService.searchInfluencers
  );

  useEffect(() => {
    const loadInfluencers = async () => {
      const queryParams = new URLSearchParams(debouncedParamsString[0]);
      const { data } = await request(queryParams);
      if (data) setInfluencers(data.influencers);
    };

    loadInfluencers();
  }, [debouncedParamsString[0]]);

  return (
    <SectionWrappers style="pt-2 md:pt-6 flex flex-col gap-2">
      <InfluencerFilterSection setParams={setParams} />

      {(loading || isStale) && <InfluencerListSkeleton length={15} />}

      {!loading && error && (
        <ErrorSection
          sectionHeight="50vh"
          errorHeading="Failed to load influencers"
          errorMessage={error.message}
        />
      )}

      {!loading && !error && influencers && (
        <>
          {debouncedParamsString && (
            <div className="font-semibold flex items-center gap-1 text-sm">
              <span className="text-primary">{influencers.length}</span>{" "}
              Influencers
            </div>
          )}
          <InfluencerList influencers={influencers} />
        </>
      )}
    </SectionWrappers>
  );
}

export default SearchPage;
