import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reports: []
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {

    addReport: (state, action) => {
      state.reports.push(action.payload);
    },

    deleteReport: (state, action) => {
      state.reports = state.reports.filter(
        r => r.id !== action.payload
      );
    }

  }
});

export const { addReport, deleteReport } = reportsSlice.actions;

export default reportsSlice.reducer;