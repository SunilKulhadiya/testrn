import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasSeenOnboarding: false
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {

    finishOnboarding: (state) => {
      state.hasSeenOnboarding = true;
    }

  }
});

export const { finishOnboarding } = appSlice.actions;

export default appSlice.reducer;