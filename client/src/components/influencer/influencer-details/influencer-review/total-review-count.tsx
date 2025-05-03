import { User } from "lucide-react";

function TotalReviewCount({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-2 border-r border-gray-300 pr-4">
      <div className="flex items-center gap-1">
        <User className="w-5 h-5 md:w-6 md:h-6" fill="#0a66c2" stroke="none" />
        <span className="text-sm font-semibold md:text-xl text-primary">
          {count}
        </span>
      </div>
      <h2 className="text-sm md:text-md font-semibold">People Reviewed</h2>
    </div>
  );
}

export default TotalReviewCount;
