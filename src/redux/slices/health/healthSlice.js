import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bloodPressure: [],
  heartRate: []
};

const healthSlice = createSlice({
  name: "health",
  initialState,
  reducers: {

    addBloodPressure: (state, action) => {
      state.bloodPressure.push(action.payload);
    },

    addHeartRate: (state, action) => {
      state.heartRate.push(action.payload);
    }

  }
});

export const {
  addBloodPressure,
  addHeartRate
} = healthSlice.actions;

export default healthSlice.reducer;