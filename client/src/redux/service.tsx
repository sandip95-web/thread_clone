import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { signInRequest, signInResponse } from "./types";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5521/api/",
    credentials: 'include',
  }),
  keepUnusedDataFor:60 * 60 * 24 * 7,
  tagTypes:['Post',"User","Me"],
  endpoints:(builder)=>({
    signin:builder.mutation<signInResponse,signInRequest>({
      query:(data)=>({
        url:"users/signin",
        method:"POST",
        body:data
      }),
      invalidatesTags:["Me"]
    })
  })
});

export const {useSigninMutation} = serviceApi;
