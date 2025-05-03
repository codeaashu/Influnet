import { Star } from "lucide-react";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface InfluencerAvgRatingProps {
  reviews?: Review[];
  avg_review_score?: number;
  size?: number | string;
  style?: string;
  isTitle: boolean;
}

function InfluencerAvgRating({
  reviews = [],
  avg_review_score,
  size = 5,
  style = "",
  isTitle,
}: InfluencerAvgRatingProps) {
  const total = reviews.length;
  const average =
    total > 0
      ? parseFloat(
          (
            reviews.reduce((sum, review) => sum + review.rating, 0) / total
          ).toFixed(1)
        )
      : 0;

  return (
    <>
      <div className="flex items-center gap-1">
        <Star className={`w-${size} h-${size}`} fill="#0a66c2" stroke="none" />
        <span className={`${style} font-semibold text-primary`}>
          {avg_review_score || average}
        </span>
      </div>
      {isTitle && (
        <h2 className="text-sm md:text-md font-semibold">Average Rating</h2>
      )}
    </>
  );
}

export default InfluencerAvgRating;
