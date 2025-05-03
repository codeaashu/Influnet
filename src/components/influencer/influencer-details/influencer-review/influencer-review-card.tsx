import RatingStars from "../../ratings/rating-starts";
import { ProfileImage } from "@/components/ui/profile-image";
import { formatDate } from "@/utils";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  // Optional: add `user` if available in future
  author: { fullname: string; profile_image?: string };
}

interface Props {
  review: Review;
}

function InfluencerReviewCard({ review }: Props) {
  return (
    <div className="h-full border border-gray-200 bg-gradient-to-b to-[#fff5f5] from-white rounded-lg p-6 transition duration-300 hover:shadow-md cursor-pointer">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <ProfileImage
            isUser={true}
            style="w-12 h-12"
            fullname={review.author.fullname} // Replace if you have user data later
            src={review.author.profile_image || ""}
            backgroundColor="bg-gray-100"
          />
          <div>
            <h4 className="text-sm font-semibold">{review.author.fullname}</h4>
            <RatingStars rating={review.rating} />
          </div>
        </div>

        {/* Review time */}
        <p className="text-xs text-gray-400">{formatDate(review.createdAt)}</p>
      </div>
      <p className="mt-4 text-[13px] text-muted-foreground leading-5 select-none max-h-20 overflow-y-auto break-words">
        {review.comment}
      </p>
    </div>
  );
}

export default InfluencerReviewCard;
