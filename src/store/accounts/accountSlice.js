import { createSlice } from "@reduxjs/toolkit";
import { getAccounts, createAccount } from "./thunk";

const initialState = {
  accounts: null,
  isLoading: false,
  error: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET Data
      .addCase(getAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accounts = action.payload;
      })
      .addCase(getAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // CREATE Account
      .addCase(createAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Create Account Error:", action.payload);
      });
  },
});

export default accountSlice.reducer;
