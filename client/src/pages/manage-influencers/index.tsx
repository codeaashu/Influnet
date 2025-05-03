import InfluencerManagementWrapper from "@/components/wrappers/influencer-managment-wrapper";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useApi } from "@/hooks";
import influencerApiService from "@/api/endpoints/influencer-api-service";
import { useEffect, useState } from "react";
import ErrorSection from "@/components/error/error-section";
import { InfluencerTableSkeleton } from "@/components/skeletons/influencer/influencer-table-skeleton";

function ManageInfluencerPage() {
  const [influencers, setInfluencers] = useState([]);
  const {
    request: getInfluencerRequest,
    loading: getInfluencerLoading,
    error: getInfluencerError,
  } = useApi(influencerApiService.getInfluencersByUser);

  useEffect(() => {
    const loadInfluencers = async () => {
      const { data: getInfluencerResponse } = await getInfluencerRequest();
      if (getInfluencerResponse) {
        setInfluencers(getInfluencerResponse.influencers);
      }
    };
    loadInfluencers();
  }, []);

  return (
    <InfluencerManagementWrapper>
      <div className="min-h-[80vh]">
        {getInfluencerLoading && <InfluencerTableSkeleton />}

        {!getInfluencerLoading && getInfluencerError && (
          <ErrorSection
            errorHeading="Failed to load influencers"
            errorMessage={getInfluencerError.message}
          />
        )}

        {!getInfluencerLoading && !getInfluencerError && (
          <DataTable columns={columns} data={influencers} />
        )}
      </div>
    </InfluencerManagementWrapper>
  );
}

export default ManageInfluencerPage;
