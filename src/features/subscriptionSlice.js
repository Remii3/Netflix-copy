import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plan: null,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: initialState,
  reducers: {
    changePlan: (state, action) => {
      state.plan = action.payload;
    },
    clearPlan: (state) => {
      state.plan = null;
    },
  },
});

export const subscriptionSliceActions = subscriptionSlice.actions;
export const selectPlan = (state) => state.plan.plan;
export default subscriptionSlice.reducer;
