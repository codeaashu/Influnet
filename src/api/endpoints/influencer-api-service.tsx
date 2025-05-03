import axios from "../axios";

// Types
interface InfluencerData {
  fullname: string;
  handle: string;
  bio: string;
  location: string;
  socialPlatforms: any[];
  categories: string[];
  profileImage: File | string;
}

// Influencer API Service
const influencerApiService = {
  // Create a new influencer
  createInfluencer: async (formData: FormData) => {
    const res = await axios.post("/influencers", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  // Get all influencers
  getAllInfluencers: async () => {
    const res = await axios.get("/influencers");
    return res.data;
  },

  // Search for influencers or get all influencers based on filters
  searchInfluencers: async (params?: any) => {
    const res = await axios.get("/influencers/search", { params });
    return res.data;
  },

  // Get a single influencer by handle
  getInfluencerByHandle: async (handle: string) => {
    const res = await axios.get(`/influencers/${handle}`);
    return res.data;
  },

  // Get influencers created by a specific user
  getInfluencersByUser: async () => {
    const res = await axios.get("/influencers/me");
    return res.data;
  },
};

export default influencerApiService;
