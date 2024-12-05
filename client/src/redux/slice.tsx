import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";
import {
  getResponse,
  myInfo,
  newPostResponse,
  Post,
  PostResponse,
  searchUserResponse,
} from "./types";
export interface ServiceState {
  openAddPostModal: boolean;
  openEditProfileModal: boolean;
  anchorE1: SVGElement | null;
  anchorE2: SVGElement | null;
  darkMode: boolean;
  myInfo: myInfo | null;
  user: myInfo | null;
  posts: Post[] | null;
  postId: string | null;
  searchedUsers: myInfo[] | null;
}

const initialState: ServiceState = {
  openAddPostModal: false,
  openEditProfileModal: false,
  anchorE1: null,
  anchorE2: null,
  darkMode: false,
  myInfo: null,
  user: null,
  posts: null,
  postId: null,
  searchedUsers: null,
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    addPostModal: (state, action: PayloadAction<boolean>) => {
      state.openAddPostModal = action.payload;
    },
    editProfileModal: (state, action: PayloadAction<boolean>) => {
      state.openEditProfileModal = action.payload;
    },
    toggleMainMenu: (state, action: PayloadAction<SVGElement | null>) => {
      state.anchorE1 = action.payload as WritableDraft<SVGElement> | null;
    },
    toggleMyMenu: (state, action: PayloadAction<SVGElement | null>) => {
      state.anchorE2 = action.payload as WritableDraft<SVGElement> | null;
    },
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
    addMyInfo: (state, action: PayloadAction<getResponse | null>) => {
      state.myInfo = action.payload?.data || null;
    },
    getUserDetail: (state, action: PayloadAction<getResponse | null>) => {
      state.user = action.payload?.data || null;
    },
    addSingle: (state, action: PayloadAction<newPostResponse | null>) => {
      const posts = state.posts || [];
      const newPost = action.payload?.newPost;

      if (newPost) {
        // Use a Map for efficient uniqueness checking
        const postMap = new Map(posts.map((post) => [post._id, post]));

        // Add the new post, overwriting if it already exists
        postMap.set(newPost._id, newPost);

        // Convert the Map back to an array
        state.posts = Array.from(postMap.values());
      }
    },

    addToAllPosts: (state, action: PayloadAction<PostResponse | null>) => {
      const newPosts = action.payload?.posts || [];

      if (newPosts.length === 0) {
        state.posts = [];
        return;
      }

      const existingPosts = new Map(
        state.posts?.map((post) => [post._id, post])
      );

      // Add or update posts
      newPosts.forEach((post) => {
        existingPosts.set(post._id, post); // Adds new post or updates the existing one
      });

      // Convert the Map back to an array and update state
      state.posts = Array.from(existingPosts.values());
    },

    deletePost: (state) => {
      state.posts =
        state.posts?.filter((post) => post._id !== state.postId) || [];
    },
    addPostId: (state, action: PayloadAction<string>) => {
      state.postId = action.payload;
    },
    addToSearchedUsers: (
      state,
      action: PayloadAction<searchUserResponse | null>
    ) => {
      state.searchedUsers = action.payload?.users as myInfo[];
    },
  },
});

export const {
  addPostModal,
  editProfileModal,
  toggleMainMenu,
  toggleMyMenu,
  toggleTheme,
  addMyInfo,
  getUserDetail,
  addToAllPosts,
  addSingle,
  deletePost,
  addToSearchedUsers,
  addPostId
} = serviceSlice.actions;

export default serviceSlice.reducer;
