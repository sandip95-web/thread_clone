import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {WritableDraft} from 'immer';
export interface ServiceState {
  openAddPostModal: boolean;
  openEditProfileModal: boolean;
  anchorE1: SVGElement | null;
  anchorE2: SVGElement | null;
  darkMode: boolean;
}

const initialState: ServiceState = {
  openAddPostModal: false,
  openEditProfileModal: false,
  anchorE1: null,
  anchorE2: null,
  darkMode: false,
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
    toggleMainMenu: (state, action:PayloadAction<SVGElement | null>) => {
      state.anchorE1 = action.payload as WritableDraft<SVGElement> | null;
    },
    toggleMyMenu: (state, action:PayloadAction<SVGElement | null>) => {
      state.anchorE2 = action.payload as WritableDraft<SVGElement> | null ;
    },
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { addPostModal, editProfileModal, toggleMainMenu, toggleMyMenu,toggleTheme } =
  serviceSlice.actions;

export default serviceSlice.reducer;
