import api from "@/services/api";
import { toast } from "sonner";

export const forgetPassword = async (email: string) => {
  try {
    const response = await api.post("auth/forget-password", email);
    if (response.status === 200) {
      toast.success(response?.data?.message);
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    console.error(error?.response?.data?.error);
    return error;
  }
};
