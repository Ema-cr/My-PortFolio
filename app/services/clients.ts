import axios, { AxiosError } from "axios";
import { IClient } from "./types";

const BASE_URL = "/api/clients";

export const postUser = async (user: Partial<IClient>): Promise<IClient> => {
  try {
    const res = await axios.post(BASE_URL, user);
    return res.data.data as IClient;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    console.error("Error postUser:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || error.message);
  }
};