import { createSlice } from "@reduxjs/toolkit";


export interface ServiceState {
  openAddPostModal: boolean;
  openEditProfileModal: boolean;
  anchorE1: SVGElement | null;
}

const initialState: ServiceState = {
  openAddPostModal: false,
  openEditProfileModal: false,
  anchorE1: null,
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    addPostModal: (state, action) => {
      state.openAddPostModal = action.payload;
    },
    editProfileModal: (state, action) => {
      state.openEditProfileModal = action.payload;
    },
    toggleMainMenu: (state, action) => {
      state.anchorE1 = action.payload;
    },
  },
});

export const { addPostModal, editProfileModal, toggleMainMenu } =
  serviceSlice.actions;

export default serviceSlice.reducer;
