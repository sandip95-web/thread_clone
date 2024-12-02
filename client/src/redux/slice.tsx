import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";
import { getResponse, myInfo, Post, PostResponse } from "./types";
export interface ServiceState {
  openAddPostModal: boolean;
  openEditProfileModal: boolean;
  anchorE1: SVGElement | null;
  anchorE2: SVGElement | null;
  darkMode: boolean;
  myInfo: myInfo | null;
  user: myInfo | null;
  posts: Post[] | null;
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
    getAllPosts: (state, action: PayloadAction<PostResponse | null>) => {
      const newPosts = [...(action.payload?.posts || [])];
      if (newPosts.length === 0) {
        state.posts = action.payload?.posts || null;
        return;
      }
      const existingPost = [...(state.posts || [])];
      newPosts.forEach((post) => {
        const exisitingIndex = existingPost.findIndex(
          (item) => item._id === post._id
        );
        if (exisitingIndex !== -1) {
          existingPost[exisitingIndex] = post;
        } else {
          existingPost.push(post);
        }
      });
      state.posts = existingPost;
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
  getAllPosts,
} = serviceSlice.actions;

export default serviceSlice.reducer;
