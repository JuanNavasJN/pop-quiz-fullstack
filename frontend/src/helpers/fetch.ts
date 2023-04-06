import axios, { AxiosError } from "axios";

const fetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_HOST,
});

export const handleError = (err: AxiosError) => {
  console.error(err);
};

export const authHeader = (accessToken: string) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export default fetch;
