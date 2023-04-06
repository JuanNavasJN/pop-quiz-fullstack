import fetch, { authHeader, handleError } from "../helpers/fetch";
import { AxiosError, AxiosResponse } from "axios";
import {
  RegisterParams,
  LoginParams,
  LoginResponse,
  ForgotParams,
  ResetParams,
  User,
} from "./AuthContext.types";

export const register = (registerParams: RegisterParams) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await fetch.post("/auth/register", registerParams);
      resolve(res.data);
    } catch (err) {
      handleError(err as AxiosError);
      reject(err);
    }
  });

export const login = async (loginParams: LoginParams) =>
  new Promise<LoginResponse>(async (resolve, reject) => {
    try {
      const res = await fetch.post("/auth/login", loginParams);
      resolve(res.data as LoginResponse);
    } catch (err) {
      handleError(err as AxiosError);
      reject(err);
    }
  });

export const forgotPassword = async (forgotParams: ForgotParams) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await fetch.post("/auth/forgot", forgotParams);
      resolve(res);
    } catch (err) {
      handleError(err as AxiosError);
      reject(err);
    }
  });

export const resetPassword = async (resetParams: ResetParams) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await fetch.post("/auth/reset", resetParams);
      resolve(res);
    } catch (err) {
      handleError(err as AxiosError);
      reject(err);
    }
  });

export const getMe = async (accessToken: string) =>
  new Promise<User>(async (resolve, reject) => {
    try {
      const res = await fetch.get("/users/me", authHeader(accessToken));
      resolve(res.data as User);
    } catch (err) {
      handleError(err as AxiosError);
      reject(err);
    }
  });
