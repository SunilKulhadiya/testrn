import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  medications: []
};

const medicationSlice = createSlice({
  name: "medication",
  initialState,
  reducers: {

    addMedication: (state, action) => {
      state.medications.push(action.payload);
    },

    removeMedication: (state, action) => {
      state.medications = state.medications.filter(
        item => item.id !== action.payload
      );
    }

  }
});

export const { addMedication, removeMedication } = medicationSlice.actions;

export default medicationSlice.reducer;