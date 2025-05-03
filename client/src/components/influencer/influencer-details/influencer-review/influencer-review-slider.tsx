import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import InfluencerReviewCard from "./influencer-review-card";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface InfluencerReviewSliderProps {
  reviews: Review[];
}

function InfluencerReviewSlider({ reviews }: InfluencerReviewSliderProps) {
  return (
    <Carousel className="mt-2">
      {reviews.length > 2 && (
        <div className="absolute -bottom-0 right-1/2 md:right-14 md:bottom-[114%] gap-0">
          <CarouselPrevious className="z-10 -left-7 hover:bg-primary hover:text-white border-primary text-primary" />
          <CarouselNext className="z-10 hover:bg-primary hover:text-white border-primary text-primary" />
        </div>
      )}

      <CarouselContent className="gap-0 pb-5">
        {reviews.map((review) => (
          <CarouselItem key={review.id} className="md:basis-1/2">
            <InfluencerReviewCard review={review} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default InfluencerReviewSlider;
