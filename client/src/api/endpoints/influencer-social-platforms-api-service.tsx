import axios from "../axios";

export interface SocialMediaPlatform {
  id: string;
  platform_name: string;
  platform_icon_url: string;
  domain_name: string;
}

export interface InfluencerSocialPlatform {
  id: string;
  influencer_id: string;
  platform_id: string;
  platform_profile_link: string;
  follower_count: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllPlatformsResponse {
  message: string;
  socialMediaPlatforms: SocialMediaPlatform[];
}

export interface CreateOrUpdatePlatformResponse {
  message: string;
  influencerSocialPlatform: InfluencerSocialPlatform;
}

export interface DeletePlatformResponse {
  message: string;
}

export interface HighestFollowerResponse {
  message: string;
  higest_followers: {
    follower_count: number;
  };
}

const influencerSocialPlatformApiService = {
  getAllSocialMediaPlatforms: async (): Promise<GetAllPlatformsResponse> => {
    const res = await axios.get<GetAllPlatformsResponse>(
      "/influencers/social-platforms"
    );
    return res.data;
  },

  createPlatform: async (
    influencer_id: string,
    data: {
      platform_id: string;
      platform_profile_link: string;
      follower_count: number;
    }
  ): Promise<CreateOrUpdatePlatformResponse> => {
    const res = await axios.post<CreateOrUpdatePlatformResponse>(
      `/influencers/social-platforms/${influencer_id}`,
      data
    );
    return res.data;
  },

  updatePlatform: async (
    influencer_id: string,
    data: {
      platform_id: string;
      platform_profile_link: string;
      follower_count: number;
    }
  ): Promise<CreateOrUpdatePlatformResponse> => {
    const res = await axios.put<CreateOrUpdatePlatformResponse>(
      `/influencers/social-platforms/${influencer_id}`,
      data
    );
    return res.data;
  },

  deletePlatform: async (
    influencer_id: string,
    data: {
      platform_id: string;
    }
  ): Promise<DeletePlatformResponse> => {
    const res = await axios.delete<DeletePlatformResponse>(
      `/influencers/social-platforms/${influencer_id}`,
      { data }
    );
    return res.data;
  },

  getHighestFollowerCount: async (): Promise<HighestFollowerResponse> => {
    const res = await axios.get<HighestFollowerResponse>(
      "/influencers/social-platforms/highest-followers"
    );
    return res.data;
  },
};

export default influencerSocialPlatformApiService;
