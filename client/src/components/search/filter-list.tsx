import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import CategoryFilter from "./filters/category-fitler";
import FollowersFilter from "./filters/followers-filter";
import RatingFilter from "./filters/rating-filter";
import SocialPlatformFilter from "./filters/social-platform-filter";

type FilterListProps = {
  searchParams: URLSearchParams;
};

function FilterList({ searchParams, setParams }: FilterListProps) {
  const navigate = useNavigate();
  const resetFilters = () => {
    const emptyParams = new URLSearchParams();
    setParams(emptyParams);

    // Force refresh by navigating to the current path
    navigate(0); // React Router v6+ supports navigate(0) to reload the current route
  };
  return (
    <>
      <SocialPlatformFilter searchParams={searchParams} setParams={setParams} />
      <CategoryFilter searchParams={searchParams} setParams={setParams} />
      <RatingFilter searchParams={searchParams} setParams={setParams} />
      <FollowersFilter searchParams={searchParams} setParams={setParams} />
      <Button
        variant="outline"
        onClick={resetFilters}
        className="ml-4 hover:bg-primary hover:text-white"
      >
        Reset
      </Button>
    </>
  );
}

export default FilterList;
