import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addCommentRequest,
  deleteCommentRequest,
  getResponse,
  loginRequest,
  newPostResponse,
  PostResponse,
  searchResponse,
  signInRequest,
  singlePostResponse,
  updateProfileRequest,
} from "./types";
import {
  addMyInfo,
  addSingle,
  addToAllPosts,
  deletePost,
  getUserDetail,
} from "./slice";
export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5521/api/",
    credentials: "include",
  }),
  keepUnusedDataFor: 60 * 60 * 24 * 7,
  tagTypes: ["Post", "User", "Me"],
  endpoints: (builder) => ({
    signin: builder.mutation<getResponse, signInRequest>({
      query: (data) => ({
        url: "users/signin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),
    login: builder.mutation<getResponse, loginRequest>({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),
    myInfo: builder.query<getResponse, void>({
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
    logout: builder.mutation<{ message: string }, void>({
      query: (data) => ({
        url: "/users/logout",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),
    userDetails: builder.query<getResponse, string>({
      query: (id) => ({
        url: `/users/detail/${id}`,
      }),
      providesTags: (_, __, id) => [{ type: "User", id }],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(getUserDetail(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    allPost: builder.query<PostResponse, string>({
      query: (page) => ({
        url: `/posts?page=${page}`,
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result.posts.map((post) => ({
                type: "Post" as const,
                id: post._id,
              })),
              { type: "Post" as const, id: "LIST" },
            ]
          : [{ type: "Post" as const, id: "LIST" }];
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(addToAllPosts(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    searchUser: builder.query<searchResponse, string>({
      query: (query) => ({
        url: `/users/search/${query}`,
      }),
    }),
    addPost: builder.mutation<newPostResponse, void>({
      query: (data) => ({
        url: "/post/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addSingle(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    followUser: builder.mutation<{ message: string }, { id: string }>({
      query: (id) => ({
        url: `/users/follow/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (_: unknown, __: unknown, { id }) => [
        { type: "User", id },
      ],
    }),

    updateProfile: builder.mutation<{ message: string }, updateProfileRequest>({
      query: (data) => ({
        url: `/users/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),
    deletePost: builder.mutation<void, { id: string }>({
      query: (id) => ({
        url: `/posts/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Post", id }],
      async onQueryStarted(_, { dispatch }) {
        try {
          dispatch(deletePost());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    likePost: builder.mutation<{ message: string }, { id: string }>({
      query: (id) => ({
        url: `/posts/like/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Post", id }],
    }),
    singlePost: builder.query<singlePostResponse, { id: string }>({
      query: (id) => ({
        url: `/posts/${id}`,
      }),
      providesTags: (_, __, { id }) => [{ type: "Post", id }],
    }),
    repost: builder.mutation<{ message: string }, { id: string }>({
      query: (id) => ({
        url: `/posts/repost/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    addComment: builder.mutation<{ message: string }, addCommentRequest>({
      query: ({ id, ...data }) => ({
        url: `/comments/add/${id}`,
        method: "Post",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteComment: builder.mutation<{ message: string }, deleteCommentRequest>({
      query: ({ postId, id }) => ({
        url: `/comments/delete/${postId}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { postId }) => [{ type: "Post", id: postId }],
    }),
  }),
});

export const {
  useSigninMutation,
  useLoginMutation,
  useMyInfoQuery,
  useLogoutMutation,
  useUserDetailsQuery,
  useAllPostQuery,
  useSearchUserQuery,
  useFollowUserMutation,
  useAddCommentMutation,
  useDeletePostMutation,
  useAddPostMutation,
  useDeleteCommentMutation,
  useUpdateProfileMutation,
} = serviceApi;
