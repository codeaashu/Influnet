import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function InfluencerDetailsSkeleton() {
  return (
    <div className="bg-gray-100 min-h-screen p-2 md:p-8 rounded-2xl">
      <div className="flex flex-col gap-3 md:gap-4">
        {/* Banner + Primary Info */}
        <Card className="border border-gray-200 rounded-xl overflow-hidden">
          <Skeleton className="h-32 md:h-48 w-full" />
          <CardContent className="flex flex-col md:flex-row gap-4 px-5 md:px-16 pt-6 pb-4 md:pb-6">
            <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
            <Skeleton className="w-10 h-8 rounded-md" />
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="w-full flex flex-col md:flex-row gap-3 md:gap-4">
          {/* Left Section */}
          <div className="w-full md:w-2/3 flex flex-col gap-3 md:gap-4">
            {/* Social List */}
            <Card className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
            </Card>

            {/* Category List (Mobile) */}
            <Card className="md:hidden flex flex-col gap-3 p-4">
              <Skeleton className="h-4 w-1/3" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Badge
                    variant="outline"
                    className="text-xs px-3 py-1 rounded-full bg-white text-primary border-gray-200"
                    key={i}
                  >
                    <Skeleton className="w-12 h-4" />
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Reviews */}
            <Card className="flex flex-col gap-3 p-4">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-6 w-1/3" />
              <div className="grid md:grid-cols-2 gap-4 mt-3">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-xl" />
                ))}
              </div>
              <Skeleton className="h-32 w-full rounded-md mt-4" />
            </Card>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            {/* Category List (Desktop) */}
            <Card className="hidden md:flex flex-col gap-3 p-4">
              <Skeleton className="h-4 w-1/3" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Badge
                    variant="outline"
                    className="text-xs px-3 py-1 rounded-full bg-white text-primary border-gray-200"
                    key={i}
                  >
                    <Skeleton className="w-12 h-4" />
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Related Influencers */}
            <Card className="p-4 space-y-3">
              <Skeleton className="h-4 w-2/3" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-2 w-16" />
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[10px] px-2 py-1 rounded-2xl border-gray-200 text-gray-200"
                  >
                    <Skeleton className="w-12 h-3" />
                  </Badge>
                </div>
              ))}
              <Skeleton className="w-1/2 h-4 mx-auto" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
