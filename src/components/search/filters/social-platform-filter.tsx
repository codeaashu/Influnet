import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useApi } from "@/hooks";
import influencerSocialPlatformApiService from "@/api/endpoints/influencer-social-platforms-api-service";
import { useEffect, useRef, useState } from "react";
import FilterInfputSkeleton from "@/components/skeletons/filter/filter-input-skeleton";

type Option = {
  label: string;
  value: string;
};

const options: Option[] = [
  { label: "Instagram", value: "instagram" },
  { label: "Facebook", value: "facebook" },
  { label: "Twitter / X", value: "twitter" },
  { label: "TikTok", value: "tiktok" },
  { label: "YouTube", value: "youtube" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "Snapchat", value: "snapchat" },
  { label: "Pinterest", value: "pinterest" },
  { label: "Reddit", value: "reddit" },
  { label: "Twitch", value: "twitch" },
  { label: "Threads", value: "threads" },
  { label: "Discord", value: "discord" },
  { label: "WhatsApp", value: "whatsapp" },
  { label: "Telegram", value: "telegram" },
  { label: "Clubhouse", value: "clubhouse" },
  { label: "Tumblr", value: "tumblr" },
  { label: "WeChat", value: "wechat" },
  { label: "Vimeo", value: "vimeo" },
  { label: "Medium", value: "medium" },
  { label: "Quora", value: "quora" },
  { label: "Line", value: "line" },
  { label: "VK", value: "vk" },
  { label: "Douyin", value: "douyin" },
  { label: "KakaoTalk", value: "kakaotalk" },
  { label: "Byte", value: "byte" },
  { label: "Triller", value: "triller" },
  { label: "Mix", value: "mix" },
  { label: "MeWe", value: "mewe" },
  { label: "Parler", value: "parler" },
  { label: "BeReal", value: "bereal" },
  { label: "Rumble", value: "rumble" },
  { label: "Lemon8", value: "lemon8" },
  { label: "Mastodon", value: "mastodon" },
  { label: "Zalo", value: "zalo" },
  { label: "Periscope", value: "periscope" },
];

type SocialPlatformFilterProps = {
  searchParams: URLSearchParams;
};

export function SocialPlatformFilter({
  searchParams,
  setParams,
}: SocialPlatformFilterProps) {
  const [allPlatforms, setAllPlatforms] = useState([]);
  const current = searchParams.get("platform_names");
  let currentPlatforms = current ? current.split(",") : [];
  const [open, setOpen] = useState(false);
  const [selectedSocialPlatforms, setSelectedSocialPlatforms] =
    useState<string[]>(currentPlatforms);

  const { request, loading } = useApi(
    influencerSocialPlatformApiService.getAllSocialMediaPlatforms
  );

  useEffect(() => {
    const loadSocialPlatforms = async () => {
      const { data: socialPlatformsResponse } = await request();
      if (socialPlatformsResponse) {
        setAllPlatforms(socialPlatformsResponse.socialMediaPlatforms);
      }
    };
    loadSocialPlatforms();
  }, []);

  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleSelection = (value: string) => {
    if (currentPlatforms.includes(value)) {
      currentPlatforms = currentPlatforms.filter((item) => item !== value);
    } else {
      currentPlatforms = [...currentPlatforms, value];
    }

    if (currentPlatforms.length > 0) {
      searchParams.set("platform_names", currentPlatforms.join(","));
      setParams(searchParams);
    } else {
      searchParams.delete("platform_names");
      setParams(searchParams);
    }

    setSelectedSocialPlatforms((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

    // Clear any previous timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    // Set a new timeout to close the dropdown after 1s of inactivity
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  // Render loading skeleton if fetching
  if (loading) return <FilterInfputSkeleton />;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[180px] justify-between overflow-hidden"
        >
          {selectedSocialPlatforms.length > 0
            ? selectedSocialPlatforms
                .map(
                  (val) =>
                    allPlatforms.find((opt) => opt.platform_name === val)
                      ?.platform_name
                )
                .join(", ")
            : "Select platforms"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0 max-h-60 overflow-y-auto">
        <Command>
          <CommandInput placeholder="Search platforms..." className="h-9" />
          <CommandGroup>
            {allPlatforms.map((platform) => (
              <CommandItem
                key={platform.platform_name}
                onSelect={() => toggleSelection(platform.platform_name)}
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    selectedSocialPlatforms.includes(platform.platform_name)
                      ? "bg-primary text-primary-foreground"
                      : "opacity-50"
                  )}
                >
                  {selectedSocialPlatforms.includes(platform.platform_name) && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </div>
                <img
                  src={platform.platform_icon_url}
                  className="w-3.5 h-3.5"
                  alt=""
                />
                {platform.platform_name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default SocialPlatformFilter;
