import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import languageReducer from "./languageSlice";
import sidebarReducer from "./sidebarSlice";
import accountReducer from "./accounts/accountSlice";
import modalsReducer from "./modalsSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
    sidebar: sidebarReducer,
    account: accountReducer,
    modals: modalsReducer,
  },
});

export default store;
