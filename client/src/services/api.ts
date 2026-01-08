import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  _id: string;
  email: string;
  username: string;
  phone: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  username: string;
  password: string;
  phone: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  message?: string;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:
      import.meta.env.VITE_MODE === "dev"
        ? "http://localhost:3000/api"
        : "/api",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAuthUser: builder.query<AuthResponse, void>({
      query: () => "/user/get-auth-user",
    }),
    loginUser: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
      }),
    }),
    registerUser: builder.mutation<AuthResponse, SignupRequest>({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAuthUserQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
} = api;
