// services/influencerApiService.ts

import axios from "../axios";

interface UpdateInfluencerData {
  fullname?: string;
  bio?: string;
  location?: string;
  profileImage?: File | string;
}

const influencerManagementApiService = {
  // Existing methods...

  // Update influencer
  updateInfluencer: async (
    influencerId: string,
    formData: UpdateInfluencerData
  ) => {
    const res = await axios.put(`/influencers/${influencerId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  // Delete influencer
  deleteInfluencer: async (influencerId: string, userId: string) => {
    const res = await axios.delete(`/influencers/${influencerId}`, {
      data: { user: { id: userId } }, // pass user in body
    });
    return res.data;
  },
};

export default influencerManagementApiService;
