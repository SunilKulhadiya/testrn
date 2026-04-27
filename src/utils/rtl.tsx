import { I18nManager } from "react-native";

export const isRTL = () => I18nManager.isRTL;

// Row direction
export const row = {
  flexDirection: I18nManager.isRTL ? "row-reverse" : "row"
};

// Row reverse helper
export const rowReverse = {
  flexDirection: I18nManager.isRTL ? "row" : "row-reverse"
};

// Text align
export const textAlign = {
  textAlign: I18nManager.isRTL ? "right" : "left"
};

// Start / End positioning
export const start = I18nManager.isRTL ? "right" : "left";
export const end = I18nManager.isRTL ? "left" : "right";