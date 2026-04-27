import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../redux/slices/auth/authSlice";
import appReducer from "../redux/slices/app/appSlice";
import reminderReducer from "../redux/slices/reminder/reminderSlice";
import medicationReducer from "../redux/slices/medication/medicationSlice";
import reportsReducer from "../redux/slices/reports/reportsSlice";
import healthReducer from "../redux/slices/health/healthSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  reminder: reminderReducer,
  medication: medicationReducer,
  reports: reportsReducer,
  health: healthReducer
});

export default rootReducer;