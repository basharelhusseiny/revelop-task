import { createSlice } from "@reduxjs/toolkit";

const initialLanguage = localStorage.getItem("lang") || "en";
document.documentElement.dir = initialLanguage === "ar" ? "rtl" : "ltr";

const initialState = {
  language: initialLanguage,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.language = state.language === "en" ? "ar" : "en";
      localStorage.setItem("lang", state.language);
      document.documentElement.dir = state.language === "ar" ? "rtl" : "ltr";
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem("lang", state.language);
      document.documentElement.dir = state.language === "ar" ? "rtl" : "ltr";
    },
  },
});

export const { toggleLanguage, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
