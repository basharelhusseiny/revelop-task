import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCollapsed: false,
  isHidden: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    setSidebar: (state, action) => {
      state.isCollapsed = action.payload.collapsed;
      state.isHidden = action.payload.hidden;
    },
  },
});

export const { toggleSidebar, setSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
