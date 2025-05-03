import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function RelatedInfluencerListSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {[...Array(5)].map((_, index) => (
        <RelatedInfluencerCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default RelatedInfluencerListSkeleton;

function RelatedInfluencerCardSkeleton() {
  return (
    <Card className="p-4 space-y-3">
      <Skeleton className="h-4 w-2/3" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between gap-3">
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
  );
}
