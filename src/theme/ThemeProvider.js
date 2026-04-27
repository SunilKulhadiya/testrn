import React, { createContext, useContext, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useColorScheme } from "react-native";

import lightTheme from "./lightTheme";
import darkTheme from "./darkTheme";

import { setTheme } from "../redux/slices/app/appSlice";

const ThemeContext = createContext({
  theme: lightTheme,
  themeMode: "system",
  setThemeMode: () => {}
});

export const ThemeProvider = ({ children }) => {

  const dispatch = useDispatch();
  const scheme = useColorScheme();

  //const themeMode = useSelector(state => state.app?.theme) || "system";
  const themeMode = useSelector(state => state?.app?.theme ?? "system");

  let theme;

  if (themeMode === "dark") {
    theme = darkTheme;
  } 
  else if (themeMode === "light") {
    theme = lightTheme;
  } 
  else {
    theme = scheme === "dark" ? darkTheme : lightTheme;
  }

  const setThemeMode = useCallback((mode) => {
    dispatch(setTheme(mode));
  }, [dispatch]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        setThemeMode
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);