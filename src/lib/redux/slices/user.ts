import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  nama: "",
  fotoProfil: "",
  email: "",
};

export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    updateUser(state, action) {
      for (const dataAttr in action.payload) {
        state[dataAttr] = action.payload[dataAttr];
      }
    },
  },
});

export const { updateUser } = userSlice.actions;

export const getCurrentUser = (state: RootState) => state.user;
