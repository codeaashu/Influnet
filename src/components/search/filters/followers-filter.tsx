import influencerSocialPlatformApiService from "@/api/endpoints/influencer-social-platforms-api-service";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { useApi } from "@/hooks";
import { cn } from "@/lib/utils";
import formatFollowers from "@/utils/format-follwers";
import { useEffect, useState } from "react";

type FollowersFilterProps = {
  searchParams: URLSearchParams;
  setParams: (params: URLSearchParams) => void;
  className?: string;
} & React.ComponentProps<typeof Slider>;

export function FollowersFilter({
  searchParams,
  setParams,
  className,
  ...props
}: FollowersFilterProps) {
  const [highestFollowers, setHighestFollowers] = useState(0);
  const [value, setValue] = useState<[number, number] | null>(null);
  const minGap = 5000;

  const { request, loading } = useApi(
    influencerSocialPlatformApiService.getHighestFollowerCount
  );

  useEffect(() => {
    const loadHighestFollowers = async () => {
      const { data } = await request();
      const highest = data.higest_followers.follower_count;

      setHighestFollowers(highest);

      const currentMin = Number(searchParams.get("min_followers")) || 0;
      const currentMax =
        Number(searchParams.get("max_followers")) || Math.round(highest / 2);

      setValue([currentMin, currentMax]);
    };

    loadHighestFollowers();
  }, []);

  const handleSliderChange = (newValue: [number, number]) => {
    let [min, max] = newValue;

    if (value) {
      if (max - min < minGap) {
        if (min === value[0]) {
          max = min + minGap;
        } else {
          min = max - minGap;
        }
      }

      if (min) {
        searchParams.set("min_followers", min.toString());
      } else {
        searchParams.delete("min_followers");
      }

      searchParams.set("max_followers", max.toString());

      setValue([min, max]);
      setParams(searchParams);
    }
  };

  return (
    <div className="flex items-center gap-4 ml-3">
      <div className={cn("relative w-[200px]", className)}>
        {loading || !value ? (
          <>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-2.5 w-full rounded-lg" />
          </>
        ) : (
          <>
            <div className="flex justify-between px-1 mb-2 text-sm font-medium">
              <div>
                {formatFollowers(value[0])}
                <span className="text-gray-400 text-xs"> to</span>
              </div>
              <div>
                {formatFollowers(value[1])}
                <span className="text-gray-400 text-xs"> followers</span>
              </div>
            </div>

            <Slider
              value={value}
              onValueChange={handleSliderChange}
              min={0}
              max={highestFollowers}
              step={1000}
              {...props}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default FollowersFilter;
