import { createSlice } from "@reduxjs/toolkit";
import { deleteLocalStorageData } from "../../../util/localstorage";
import { RootState } from "../store";

const initialState = {
  isLoggedIn: false,
  isLoading: true
};

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    authorize(state, action) {
      state.isLoading = true
      state.isLoggedIn = action.payload;
      state.isLoading = false
    },
    logout(state) {
      state.isLoading = true
      deleteLocalStorageData("isLoggedIn");

      state.isLoggedIn = false;
      state.isLoading = false
    },
  },
});

export const { authorize, logout } = authSlice.actions;

export const getIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const getAuthIsLoading = (state: RootState) => state.auth.isLoading;
