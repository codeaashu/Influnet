import AddReviewForm from "@/components/forms/review/add-review-form";
import InfluencerAvgRating from "../../ratings/influencer-avg-rating";
import InfluencerReviewSlider from "./influencer-review-slider";
import TotalReviewCount from "./total-review-count";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

// Define the expected shape of a review
type Review = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  author: { id: string; fullname: string; profile_image?: string };
};

interface Props {
  reviews: Review[];
}

function InfluencerReviewsContainer({
  reviews: initialReview,
  influencer,
}: Props) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState(initialReview);
  const isReviewed = reviews.find((review) => review.author.id == user?.id);
  return (
    <div className="flex flex-col gap-2 mt-3 md:mt-4">
      {reviews.length > 0 && (
        <>
          <div className="flex items-center">
            <TotalReviewCount count={reviews.length} />
            <div className="flex items-center gap-2 pl-4">
              <InfluencerAvgRating
                size="5"
                style="text-sm md:text-xl"
                reviews={reviews}
                isTitle={true}
              />
            </div>
          </div>
          <InfluencerReviewSlider reviews={reviews} />
        </>
      )}
      {!isReviewed && (
        <AddReviewForm setReviews={setReviews} influencer={influencer} />
      )}
    </div>
  );
}

export default InfluencerReviewsContainer;
