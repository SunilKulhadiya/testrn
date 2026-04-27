import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  email: null,
  phone: null,
  password: null,
  mpin: null,
  isLoggedIn: false,
  biometricEnabled: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    registerUser: (state, action) => {
      const { user, email, phone, password, mpin } = action.payload;

      state.user = user;
      state.email = email;
      state.phone = phone;
      state.password = password;
      state.mpin = mpin;
    },

    updateMPIN: (state, action) => {
      state.mpin = action.payload;
    },

    updatePassword: (state, action) => {
      state.password = action.payload;
    },

    loginWithMPIN: (state, action) => {
      //if (state.mpin === action.payload) {
        state.isLoggedIn = true;
      //}
    },

    enableBiometric: (state) => {
      state.biometricEnabled = true;
    },

    logout: (state) => {
      state.isLoggedIn = false;
    }

  }
});

export const {
  registerUser,
  updateMPIN,
  updatePassword,
  loginWithMPIN,
  enableBiometric,
  logout
} = authSlice.actions;

export default authSlice.reducer;