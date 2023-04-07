import { AxiosError } from "axios";
import fetch, { authHeader, handleError } from "../helpers/fetch";
import { Review } from "./reviews";

export interface Event {
  title: string;
  description: string;
  location: string;
  datetime: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
  rating?: number;
  myReview?: Review;
}

export const getAllEvents = (accessToken: string) =>
  new Promise<Event[]>(async (resolve, reject) => {
    try {
      const res = await fetch.get("/events", authHeader(accessToken));
      resolve(res.data as Event[]);
    } catch (err) {
      handleError(err as AxiosError);
      reject(err);
    }
  });

export const createEvent = (accessToken: string, newEvent: Event) =>
  new Promise<Event>(async (resolve, reject) => {
    try {
      const res = await fetch.post(
        "/events",
        newEvent,
        authHeader(accessToken),
      );
      resolve(res.data as Event);
    } catch (err) {
      handleError(err as AxiosError);
      reject(err);
    }
  });

export const getEventById = (accessToken: string, eventId: string) =>
  new Promise<Event>(async (resolve, reject) => {
    try {
      const res = await fetch.get(
        `/events/${eventId}`,
        authHeader(accessToken),
      );
      resolve(res.data as Event);
    } catch (err) {
      handleError(err as AxiosError);
      reject(err);
    }
  });

export const deleteEventById = (accessToken: string, eventId: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await fetch.delete(
        `/events/${eventId}`,
        authHeader(accessToken),
      );
      resolve(res.data);
    } catch (err) {
      handleError(err as AxiosError);
      reject(err);
    }
  });
