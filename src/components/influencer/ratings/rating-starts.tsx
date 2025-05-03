import { Star } from "lucide-react";

type RatingStarsProps = {
  rating: number; // 1 to 5, can be decimal like 4.3
  size?: number; // optional icon size
};

export default function RatingStars({ rating, size = 12 }: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const totalStars = 5;

  return (
    <div className="flex items-center gap-[2px]">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={size} stroke="none" fill="#0a66c2" />
      ))}
      {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map(
        (_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-primary" />
        )
      )}
    </div>
  );
}
