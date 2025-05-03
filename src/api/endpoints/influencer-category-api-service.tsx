// services/influencerCategoryApiService.ts
import axios from "../axios";

export interface CategoryResponse {
  message: string;
  categories: string[];
}

export interface CreatedCategoryResponse {
  message: string;
  category: {
    id: string;
    influencer_id: string;
    category_name: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ApiMessage {
  message: string;
}

const influencerCategoryApiService = {
  getAllCategories: async (): Promise<CategoryResponse> => {
    const res = await axios.get<CategoryResponse>("/influencers/categories");
    return res.data;
  },

  createCategory: async (
    influencerId: string,
    category: string
  ): Promise<CreatedCategoryResponse> => {
    const res = await axios.post<CreatedCategoryResponse>(
      `/influencers/categories/${influencerId}`,
      { category }
    );
    return res.data;
  },

  deleteCategory: async (
    influencerId: string,
    categoryId: string
  ): Promise<ApiMessage> => {
    const res = await axios.delete<ApiMessage>(
      `/influencers/categories/${influencerId}`,
      {
        data: { category_id: categoryId },
      }
    );
    return res.data;
  },
};

export default influencerCategoryApiService;
