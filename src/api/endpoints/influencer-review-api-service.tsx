import axios from "../axios";

export interface Review {
  id: string;
  influencer_id: string;
  user_id: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    fullname: string;
    profile_image: string;
  };
}

export interface ReviewResponse {
  message: string;
  reviews: Review[];
}

export interface SingleReviewResponse {
  message: string;
  review: Review;
}

const reviewApiService = {
  getReviewsByInfluencerId: async (
    influencer_id: string
  ): Promise<ReviewResponse> => {
    const res = await axios.get<ReviewResponse>(`/reviews/${influencer_id}`);
    return res.data;
  },

  createReview: async (
    influencer_id: string,
    review: { rating: number; comment: string }
  ): Promise<SingleReviewResponse> => {
    console.log(review);
    const res = await axios.post<SingleReviewResponse>(
      `/influencers/reviews/${influencer_id}`,
      review
    );
    return res.data;
  },

  updateReview: async (
    influencer_id: string,
    data: { rating: number; comment: string }
  ): Promise<SingleReviewResponse> => {
    const res = await axios.put<SingleReviewResponse>(
      `/reviews/${influencer_id}`,
      data
    );
    return res.data;
  },
};

export default reviewApiService;
