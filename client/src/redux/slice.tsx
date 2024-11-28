import { createSlice } from "@reduxjs/toolkit";

export interface ServiceState {
  openAddPostModal: boolean;
}

const initialState: ServiceState = {
  openAddPostModal: false,
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    addPostModal: (state,action) => {
     state.openAddPostModal = action.payload
    },
  },
});


export const { addPostModal} = serviceSlice.actions;

export default serviceSlice.reducer;
