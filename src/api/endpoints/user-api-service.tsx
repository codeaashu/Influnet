import axios from "../axios";

export interface UpdateUserResponse {
  message: string;
  user: {
    fullname: string;
    profile_image: string;
  };
}

const userApiServices = {
  updateUser: async (formData: FormData): Promise<UpdateUserResponse> => {
    const res = await axios.put<UpdateUserResponse>("/users/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
};

export default userApiServices;
