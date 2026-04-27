import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasSeenOnboarding: false,
  theme: "system",
  language: "en"
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {

    finishOnboarding: (state) => {
      state.hasSeenOnboarding = true;
    },

    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    setLanguage: (state, action) => {
      state.language = action.payload;
    }

  }
});

export const {
  finishOnboarding,
  setTheme,
  setLanguage
} = appSlice.actions;

export default appSlice.reducer;