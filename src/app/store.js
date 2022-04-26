import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import subscriptionSlice from "../features/subscriptionSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    plan: subscriptionSlice,
  },
});
