// import { useLoaderData } from "react-router-dom";

import { Button } from "@/components/ui/button";
import SectionWrappers from "@/components/wrappers/section-wrapper";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks";
import influencerApiService from "@/api/endpoints/influencer-api-service";
import InfluencerList from "@/components/influencer/influencer-list";
import InfluencerListSkeleton from "@/components/skeletons/influencer/influencer-list-skeleton";
import ErrorSection from "@/components/error/error-section";

function InfluencerListHome() {
  const [influencers, setInfluencers] = useState([]);
  const { request, loading, error } = useApi(
    influencerApiService.searchInfluencers
  );
  useEffect(() => {
    const loadInfluencers = async () => {
      const { data } = await request();
      if (data) setInfluencers(data.influencers);
    };
    loadInfluencers();
  }, []);

  return (
    <SectionWrappers style="bg-gradient-to-t to-[#ffe6e6] from-white">
      <div>
        <h1 className="text-[30px] md:text-[52px] mb-6 md:mb-12 text-center font-bold leading-tight">
          Rising Voices
        </h1>

        {loading && <InfluencerListSkeleton length={15} />}
        {error && (
          <ErrorSection
            errorHeading="Faild to load influencer list"
            errorMessage={error.message}
          />
        )}

        {/* No Results */}
        {!loading && !error && influencers.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No Influencer found.
          </div>
        )}

        {/* Influencer List */}
        {!loading && !error && influencers.length > 0 && (
          <>
            <InfluencerList influencers={influencers.slice(0, 15)} />

            <div className="flex justify-center mt-6 md:mt-12">
              <Link to="/search">
                <Button className="md:px-6 md:py-5 md:text-base border border-primary bg-transparent hover:bg-primary text-primary hover:text-white">
                  All Influencers
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </SectionWrappers>
  );
}

export default InfluencerListHome;
