import FilterList from "../filter-list";
import { Button } from "../../ui/button";
import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";

function InfluencerFilterSection({ setParams }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return (
    <div className="overflow-x-auto w-full pb-2 hide-scrollbar">
      <div className="flex items-center gap-3 whitespace-nowrap">
        {/* <Button
          onClick={filterInfluencers}
          className="bg-muted text-primary border border-primary hover:bg-primary hover:text-white"
        >
          <Search className="w-4 h-4 mr-1" strokeWidth={3} />
          Filter
        </Button> */}
        <FilterList searchParams={searchParams} setParams={setParams} />
      </div>
    </div>
  );
}

export default InfluencerFilterSection;
