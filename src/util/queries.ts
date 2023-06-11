import { AxiosError } from "axios";
import axios from "./axios";

export const fetchUser = async () => {
  try {
    const response = await axios.get("/auth/user");
    return response.data;
  } catch (err: AxiosError | unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data);
    }
  }  
}