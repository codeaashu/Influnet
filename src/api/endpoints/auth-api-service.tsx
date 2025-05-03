import axios from "../axios";

export interface AuthResponse {
  message: string;
  token: string;
}

export interface UserProfile {
  message: string;
  user: {
    id: string;
    email: string;
    fullname: string;
    profile_image: string;
  };
}

const authApiService = {
  login: async (formData: FormData): Promise<AuthResponse> => {
    const res = await axios.post<AuthResponse>("/auth/login", formData);
    return res.data;
  },

  register: async (formData: FormData): Promise<AuthResponse> => {
    const res = await axios.post<AuthResponse>("/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  getProfile: async (): Promise<UserProfile> => {
    const res = await axios.get<UserProfile>("/users/me");
    return res.data;
  },
  logout: async (): Promise<UserProfile> => {
    const res = await axios.post<UserProfile>("/auth/logout");
    return res.data;
  },
};

export default authApiService;
