import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  loginRequest,
  myInfoResponse,
  signInRequest,
  signInResponse,
} from "./types";
import { addMyInfo } from "./slice";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5521/api/",
    credentials: "include",
  }),
  keepUnusedDataFor: 60 * 60 * 24 * 7,
  tagTypes: ["Post", "User", "Me"],
  endpoints: (builder) => ({
    signin: builder.mutation<signInResponse, signInRequest>({
      query: (data) => ({
        url: "users/signin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),
    login: builder.mutation<signInResponse, loginRequest>({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),
    myInfo: builder.query<myInfoResponse, void>({
      query: () => ({
        url: "/users/me",
      }),
      providesTags: ["Me"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addMyInfo(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useSigninMutation, useLoginMutation,useMyInfoQuery } = serviceApi;
