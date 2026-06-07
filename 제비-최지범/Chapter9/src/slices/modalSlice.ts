import { createSlice } from "@reduxjs/toolkit";

export interface modalState {
  isOpen: boolean;
  title?: string;
  content?: string;
  value?: boolean;
}

const initialState: modalState = {
  isOpen: false,
  title: "",
  content: "",
  value: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action): void => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
    },
    closeModal: (state, action): void => {
      state.isOpen = false;
      state.title = "";
      state.content = "";
      state.value = action.payload.value;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
