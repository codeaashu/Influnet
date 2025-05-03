import { useEffect, useRef, useState } from "react";
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
import influencerCategoryApiService from "@/api/endpoints/influencer-category-api-service";
import FilterInfputSkeleton from "@/components/skeletons/filter/filter-input-skeleton";

type CategoryFilterProps = {
  searchParams: URLSearchParams;
};

export function CategoryFilter({
  searchParams,
  setParams,
}: CategoryFilterProps) {
  const [allCategories, setAllCategories] = useState([]);
  const current = searchParams.get("category_names");
  let currentCategories = current ? current.split(",") : [];
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(currentCategories);

  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleSelection = (value: string) => {
    // Toggle the selected value
    if (currentCategories.includes(value)) {
      currentCategories = currentCategories.filter((item) => item !== value);
    } else {
      currentCategories = [...currentCategories, value];
    }

    // Update searchParams with the new list
    if (currentCategories.length > 0) {
      searchParams.set("category_names", currentCategories.join(","));
      setParams(searchParams);
    } else {
      searchParams.delete("category_names");
      setParams(searchParams);
    }

    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

    // Debounce setOpen(false) - only call after user stops interacting
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  const { request, loading } = useApi(
    influencerCategoryApiService.getAllCategories
  );

  useEffect(() => {
    const loadCategories = async () => {
      const { data: categoriesResponse } = await request();
      if (categoriesResponse) {
        const capitalizeWords = (input: string) => {
          return input
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        };
        setAllCategories(
          categoriesResponse.categories.map((category: string) =>
            capitalizeWords(category)
          )
        );
      }
    };
    loadCategories();
  }, []);

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
          {selected.length > 0
            ? selected
                .map((val) => allCategories.find((opt) => opt === val))
                .join(", ")
            : "Select categories"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0 max-h-60 overflow-y-auto">
        <Command>
          <CommandInput placeholder="Search fruits..." className="h-9" />
          <CommandGroup>
            {allCategories.map((category) => {
              return (
                <CommandItem
                  key={category}
                  onSelect={() => toggleSelection(category)}
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      selected.includes(category)
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50"
                    )}
                  >
                    {selected.includes(category) && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </div>
                  {category}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default CategoryFilter;
