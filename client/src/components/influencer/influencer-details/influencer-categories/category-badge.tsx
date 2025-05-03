import influencerCategoryApiService from "@/api/endpoints/influencer-category-api-service";
import { Badge } from "@/components/ui/badge";
import { useApi } from "@/hooks";
import { LoaderIcon, X } from "lucide-react";
import { toast } from "sonner";

function CategoryBadge({ category, influencerId, categories, setCategories }) {
  const { request: categoryRemoveRequest, loading: categoryRemoveLoading } =
    useApi(influencerCategoryApiService.deleteCategory);

  const handleRemove = async (categoryToRemove) => {
    const { data: categoryRemoveResponse, error: categoryRemoveError } =
      await categoryRemoveRequest(influencerId, categoryToRemove.id);

    if (categoryRemoveResponse) {
      const filteredCategories = categories.filter(
        (cat) => cat.id !== categoryToRemove.id
      );
      setCategories(filteredCategories);
      toast.success(categoryRemoveResponse.message);
    } else if (categoryRemoveError) {
      toast.error(categoryRemoveError.message);
    }
  };

  return (
    <Badge
      onClick={() => handleRemove(category)}
      key={category.id}
      variant="outline"
      className={`group cursor-pointer flex items-center gap-1 text-xs px-3 py-1 rounded-full transition duration-300 bg-white border  ${
        categoryRemoveLoading
          ? "border-gray-300 text-gray-300"
          : "text-primary border-primary"
      }`}
    >
      {category.category_name}

      {categoryRemoveLoading ? (
        <LoaderIcon className="z-50 w-3 h-3 text-gray-300 " />
      ) : (
        <X
          className="z-50 w-3 h-3 cursor-pointer group-hover:scale-150 transition duration-300"
          strokeWidth={3}
        />
      )}
    </Badge>
  );
}

export default CategoryBadge;
