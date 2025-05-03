import influencerCategoryApiService from "@/api/endpoints/influencer-category-api-service";
import InputFieldError from "@/components/error/input-field-error";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApi } from "@/hooks";
import { LoaderIcon, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import CategoryBadge from "./category-badge";
import { useAuth } from "@/hooks/use-auth";

type Category = {
  id: string;
  influencer_id: string;
  category_name: string;
};

type InfluencerCategoryListProps = {
  style?: string;
  categories: Category[];
  setInfluencer: () => void;
};

function InfluencerCategoryList({
  style,
  influencer,
  setInfluencer,
}: InfluencerCategoryListProps) {
  const { user } = useAuth();
  const [categories, setCategories] = useState(influencer.categories);
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [selected, setSelected] = useState(null);
  const isMe = user?.id == influencer.user_id;

  const handleChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    const isCategoryExist = categories.some(
      (cat) => cat.category_name.toLowerCase() === value.toLowerCase()
    );

    if (isCategoryExist) {
      setCategoryError("This category already included");
    } else {
      setCategoryError("");
    }

    if (value.trim() === "") {
      // setFilteredSuggestions([]);
      // setShowDropdown(false);
    } else {
      // const filtered = suggestionsList.filter((s) =>
      //   s.toLowerCase().includes(value.toLowerCase())
      // );
      // setFilteredSuggestions(filtered);
      // setShowDropdown(true);
    }
    setSelected(null); // Clear previous selection
  };

  const { request: categoryAddRequest, loading: categoryAddLoading } = useApi(
    influencerCategoryApiService.createCategory
  );
  const handleAdd = async () => {
    const categoryToAdd = selected || category;
    const isCategoryExist = categories.some(
      (cat) => cat.category_name.toLowerCase() === categoryToAdd.toLowerCase()
    );
    if (categoryToAdd.trim() !== "" && !isCategoryExist) {
      setCategoryError("");

      const { data: categoryAddResponse, error: categoryAddError } =
        await categoryAddRequest(influencer.id, categoryToAdd);

      if (categoryAddResponse) {
        const updatedCategories = [...categories, categoryAddResponse.category];
        setCategories(updatedCategories);
        toast.success(categoryAddResponse.message);
        setCategory("");
        // setFilteredSuggestions([]);
        // setShowDropdown(false);
      } else if (categoryAddError) {
        toast.error(categoryAddError.message);
      }
    } else if (categoryToAdd.trim() == "") {
      setCategoryError("Please write a category");
    } else if (isCategoryExist) {
      setCategoryError("This category already included");
      return;
    }
  };

  return (
    <div
      className={`p-4 ${style} flex-col gap-4 border border-gray-200 rounded-xl`}
    >
      {/* Categories card header */}
      <div className="flex items-start justify-between">
        <h4 className="text-sm font-semibold">Categories</h4>
      </div>
      {/* Category list */}

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <CategoryBadge
              category={cat}
              influencerId={influencer.id}
              categories={categories}
              setCategories={setCategories}
            />
          ))}
        </div>
      )}

      {/* Add category */}
      {isMe && (
        <div className="relative max-w-md">
          <div className="flex gap-2">
            <Input
              value={category}
              onChange={handleChange}
              className="flex-1 text-xs md:text-sm border-none shadow-none bg-gray-100"
            />

            <Button
              disabled={categoryAddLoading}
              onClick={handleAdd}
              variant="outline"
              className="group h-full border border-gray-300 bg-white hover:bg-primary hover:border-primary"
            >
              {categoryAddLoading ? (
                <LoaderIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-500" />
              ) : (
                <Plus className="w-5 h-5 text-gray-400 group-hover:text-white" />
              )}
            </Button>
          </div>

          {/* {showDropdown && filteredSuggestions.length > 0 && (
          <ul className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-md">
            {filteredSuggestions.map((suggestion, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(suggestion)}
                className={cn(
                  "px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                )}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )} */}
        </div>
      )}

      {/* {error && <InputFieldError errMessage={error} />} */}
      {categoryError && <InputFieldError errMessage={categoryError} />}
    </div>
  );
}

export default InfluencerCategoryList;
