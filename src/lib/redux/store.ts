import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { userSlice } from "./slices/user";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore['dispatch']
