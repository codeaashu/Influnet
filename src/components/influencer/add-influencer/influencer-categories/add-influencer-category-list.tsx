import InputFieldError from "@/components/error/input-field-error";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import { useState } from "react";

type Category = {
  id: string;
  influencer_id: string;
  category_name: string;
};

type InfluencerCategoryListProps = {
  style?: string;
  categories: Category[];
};
// const suggestionsList = [
//   "Instagram",
//   "YouTube",
//   "Twitter",
//   "TikTok",
//   "LinkedIn",
// ];

function AddInfluencerCategoryList({
  style,
  categories,
  setCategories,
  error,
  influencerSchema,
  setErrors,
}: InfluencerCategoryListProps) {
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");
  // const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  // const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    const isCategoryExist = categories.some(
      (cat) => cat.toLowerCase() === value.toLowerCase()
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

  // const handleSelect = (suggestion) => {
  //   setCategory(suggestion);
  //   setSelected(suggestion);
  //   setShowDropdown(false);
  // };

  const handleAdd = () => {
    const categoryToAdd = selected || category;
    const isCategoryExist = categories.some(
      (cat) => cat.toLowerCase() === categoryToAdd.toLowerCase()
    );
    if (categoryToAdd.trim() !== "" && !isCategoryExist) {
      setCategoryError("");
      const updatedCategories = [...categories, categoryToAdd];

      setCategories(updatedCategories);
      setCategory("");
      // setFilteredSuggestions([]);
      // setShowDropdown(false);
      try {
        influencerSchema
          .pick({ categories: true })
          .parse({ categories: updatedCategories });

        // If valid, clear the error
        setErrors((prevErrors) => {
          const updated = { ...prevErrors };
          delete updated["categories"];
          return updated;
        });
      } catch (error) {
        // Optional: handle validation error if needed
      }
    } else if (categoryToAdd.trim() == "") {
      setCategoryError("Please write a category");
    } else if (isCategoryExist) {
      setCategoryError("This category already included");
      return;
    }
  };

  const handleRemove = (categoryToRemove) => {
    const filteredCategories = categories.filter(
      (category) => category !== categoryToRemove
    );

    setCategories(filteredCategories);
  };

  return (
    <div
      className={`p-4 ${style} flex-col space-y-2 border border-gray-200 rounded-xl`}
    >
      {/* Categories card header */}

      <h4 className="text-sm font-semibold">Categories</h4>
      {/* <Button className="w-10 h-8 flex items-center justify-center shadow-none text-primary bg-white hover:bg-primary hover:text-white hover:shadow-lg"></Button> */}
      {/* <Button className="w-7 h-7 flex items-center justify-center text-primary border border-primary bg-white hover:bg-primary  hover:text-white shadow-lg">
          <Plus className="w-3 h-3" />
        </Button> */}

      {/* Category list */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat, idx) => (
            <Badge
              onClick={() => handleRemove(cat)}
              key={`${cat}${idx}`}
              variant="outline"
              className="group cursor-pointer flex items-center gap-1 text-xs px-3 py-1 rounded-full transition duration-300 bg-white text-primary border border-primary"
            >
              {cat}
              <X
                className="z-50 w-3 h-3 cursor-pointer group-hover:scale-150 transition duration-300"
                strokeWidth={3}
              />
            </Badge>
          ))}
        </div>
      )}

      {/* Add category */}
      <div className="relative max-w-md">
        <div className="flex gap-2">
          <Input
            value={category}
            onChange={handleChange}
            className="flex-1 text-xs md:text-sm border-none shadow-none bg-gray-100"
          />

          <Button
            onClick={handleAdd}
            variant="outline"
            className="group h-full border border-gray-300 bg-white hover:border-gray-400"
          >
            <Plus className="w-5 h-5 text-gray-400 group-hover:text-gray-500" />
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

      {error && <InputFieldError errMessage={error} />}
      {categoryError && <InputFieldError errMessage={categoryError} />}
    </div>
  );
}

export default AddInfluencerCategoryList;
