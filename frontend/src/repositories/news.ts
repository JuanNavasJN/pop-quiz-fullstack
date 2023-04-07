import fetch, { handleError } from "../helpers/fetch";
import { AxiosError } from "axios";

export interface Article {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

export const getAllNews = () =>
  new Promise<Article[]>(async (resolve, reject) => {
    try {
      const res = await fetch.get("/news");
      resolve(res.data as Article[]);
    } catch (err) {
      handleError(err as AxiosError);
      reject(err);
    }
  });
