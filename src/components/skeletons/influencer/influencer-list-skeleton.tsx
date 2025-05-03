import React from "react";
import SkeletonCard from "./influencer-card-skeleton";

function InfluencerListSkeleton({ length }) {
  return (
    <>
      <div className="font-semibold flex items-center gap-1 text-sm">
        <span className="text-primary"></span> Searching influencers...
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {Array.from({ length }).map((number, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    </>
  );
}

export default InfluencerListSkeleton;
