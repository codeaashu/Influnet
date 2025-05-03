import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <Card className="relative rounded-xl py-4 shadow-md border border-gray-200 bg-gradient-to-b to-[#fff4f4] from-white">
      <CardContent className="p-4 flex flex-col items-center text-center space-y-3">
        {/* Rating Skeleton */}
        <div className="absolute top-5 right-5">
          <Skeleton className="w-10 h-4 rounded-md bg-gray-200" />
        </div>

        {/* Profile Image */}
        <Skeleton className="w-24 h-24 rounded-full bg-gray-200" />

        {/* Name & Handle */}
        <div className="mb-5 space-y-2">
          <Skeleton className="h-4 w-32 mx-auto rounded bg-gray-200" />
          <Skeleton className="h-3 w-20 mx-auto rounded bg-gray-200" />
        </div>

        {/* Social Platforms */}
        <div className="flex flex-wrap justify-center gap-2">
          {[1, 2].map((_, idx) => (
            <Skeleton key={idx} className="h-6 w-20 rounded-md bg-gray-200" />
          ))}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mt-2">
          {[1, 2, 3].map((_, idx) => (
            <Skeleton key={idx} className="h-6 w-16 rounded-full bg-gray-200" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
