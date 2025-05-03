import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500); // Debounce delay in ms

  const performSearch = (search: string) => {
    const trimmedQuery = search.trim();
    const searchParams = new URLSearchParams(location.search);

    if (trimmedQuery) {
      searchParams.set("q", trimmedQuery);
    } else {
      searchParams.delete("q");
    }

    navigate(`/search?${searchParams.toString()}`, { replace: false });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      performSearch(query);
    }
  };

  useEffect(() => {
    if (debouncedQuery || location.pathname == "/search") {
      performSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div className="relative w-full md:w-[300px] pl-2 md:pl-0">
      {/* Search Icon */}
      <Search
        onClick={() => setIsFocused(true)}
        className={`absolute right-0 md:left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-all duration-300 ease-in-out ${
          isFocused ? "opacity-0 -translate-x-3" : "opacity-100"
        }`}
      />

      {/* Input */}
      <Input
        onChange={(e) => setQuery(e.target.value)}
        ref={inputRef}
        placeholder="influencer name or handle"
        className={`transition-all duration-300 ease-in-out text-sm md:text-md pl-10 w-0 md:w-[300px] placeholder:text-gray-300  ${
          isFocused ? "w-full pl-3 pr-10" : "hidden md:flex"
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        value={query}
      />

      {/* Debounced Search Icon */}
      {/* <Search
        onClick={() => performSearch(query)}
        className={`absolute cursor-pointer right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-all duration-300 ease-in-out ${
          isFocused
            ? "opacity-100 z-20"
            : "opacity-0 translate-x-12 md:translate-x-6 -z-20"
        }`}
      /> */}
    </div>
  );
}
