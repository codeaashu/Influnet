import * as React from "react";
import { Check, Star } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

const ratings = [1, 2, 3, 4, 5];

type RatingFilterProps = {
  searchParams: URLSearchParams;
};

export function RatingFilter({ searchParams, setParams }: RatingFilterProps) {
  const current = searchParams.get("min_rating");
  const rating = current || null;
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<number | string | null>(
    rating
  );

  const handleSelect = (rating: number) => {
    searchParams.set("min_rating", rating.toString());

    setSelected(rating);
    setOpen(false); // auto close after selection
    setParams(searchParams);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[110px] justify-between"
        >
          {selected ? (
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span>
                {" "}
                {selected} Star{selected > 1 ? "s" : ""} {selected !== 5 && "+"}
              </span>
            </span>
          ) : (
            "Min Rating"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[110px] p-0">
        <Command>
          <CommandGroup>
            {ratings.map((rating) => (
              <CommandItem key={rating} onSelect={() => handleSelect(rating)}>
                <Star
                  className={cn(
                    "mr-1 h-4 w-4",
                    selected === rating
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  )}
                  fill={selected === rating ? "currentColor" : "none"}
                />
                {rating} Star{rating > 1 ? "s" : ""}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default RatingFilter;
