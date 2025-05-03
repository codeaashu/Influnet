import { Badge } from "@/components/ui/badge";
import { ProfileImage } from "@/components/ui/profile-image";
import { Link } from "react-router-dom";

// Define the types of the influencer and category props
interface Category {
  id: string;
  category_name: string;
  influencer_id: string;
}

interface RelatedInfluencerCardProps {
  influencer: {
    id: string;
    fullname: string;
    handle: string;
    profile_image?: string;
    categories: Category[]; // This should be an array of categories
  };
}

function RelatedInfluencerCard({ influencer }: RelatedInfluencerCardProps) {
  return (
    <Link to={`/influencers/${influencer.handle}`}>
      <div className="flex items-center justify-between flex-wrap gap-4 bg-gray-100 p-3 rounded-xl">
        <div className="flex items-center gap-2 md:gap-3">
          <ProfileImage
            isInfluencer={true}
            style="w-9 h-9 md:w-12 md:h-12"
            fullname={influencer.fullname}
            src={influencer.profile_image || ""}
            backgroundColor="bg-gray-200 text-sm"
          />
          <div>
            <h4 className="text-[12px] md:text-sm font-semibold">
              {influencer.fullname}
            </h4>
            <p className="text-[10px] md:text-xs text-muted-foreground">
              @{influencer.handle}
            </p>
          </div>
        </div>

        {/* Display the categories */}
        <div className="flex gap-2 flex-wrap">
          <Badge
            variant="outline"
            className="h-[fit-content] text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full text-primary border-1 border-primary"
          >
            {influencer.categories[0].category_name}
          </Badge>
        </div>
      </div>
    </Link>
  );
}

export default RelatedInfluencerCard;
