import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reminders: []
};

const reminderSlice = createSlice({
  name: "reminder",
  initialState,

  reducers: {

    addReminder: (state, action) => {
      state.reminders.push(action.payload);
    },

    removeReminder: (state, action) => {

      state.reminders = state.reminders.filter(
        r => r.id !== action.payload
      );

    }

  }

});

export const {
  addReminder,
  removeReminder
} = reminderSlice.actions;

export default reminderSlice.reducer;