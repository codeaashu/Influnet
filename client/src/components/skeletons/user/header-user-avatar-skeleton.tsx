import { Skeleton } from "@/components/ui/skeleton";

function HeaderUserAvatarSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="w-10 h-10 rounded-full border-gray-200" />
      <div className="hidden md:flex md:flex-col gap-1">
        <Skeleton className="w-24 h-3 rounded border-gray-200" />
        <Skeleton className="w-24 h-2 rounded border-gray-200" />
      </div>
    </div>
  );
}

export default HeaderUserAvatarSkeleton;
