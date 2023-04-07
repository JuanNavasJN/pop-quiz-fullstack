import { AxiosError } from "axios";
import fetch, { authHeader, handleError } from "../helpers/fetch";

interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
}

export interface Review {
  comment?: string;
  rating: number;
  eventId: string;
  _id?: string;
  isDraft?: boolean;
  createdBy?: User;
  createdAt?: string;
  updatedAt?: string;
}

export const createReview = (accessToken: string, newRivew: Review) =>
  new Promise<Review>(async (resolve, reject) => {
    try {
      const res = await fetch.post(
        "/reviews",
        newRivew,
        authHeader(accessToken),
      );
      resolve(res.data as Review);
    } catch (err) {
      handleError(err as AxiosError);
      reject(err);
    }
  });

export const getReviewsByEventId = (accessToken: string, eventId: string) =>
  new Promise<Review[]>(async (resolve, reject) => {
    try {
      const res = await fetch.get(
        `/reviews/events/${eventId}`,
        authHeader(accessToken),
      );
      resolve(res.data as Review[]);
    } catch (err) {
      handleError(err as AxiosError);
      reject(err);
    }
  });
