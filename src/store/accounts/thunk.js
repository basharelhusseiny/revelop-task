import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, COMPANY_DOMAIN, TOKEN } from "../../config";

export const getAccounts = createAsyncThunk(
  "account/getAccounts",
  async ({ page = 1, perPage = 10 } = {}, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(
        `${API_URL}?page=${page}&per_page=${perPage}`,
        {
          method: "GET",
          headers: {
            "X-Company-Domain": COMPANY_DOMAIN,
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// CREATE New Account
export const createAccount = createAsyncThunk(
  "account/createAccount",
  async (accountData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "X-Company-Domain": COMPANY_DOMAIN,
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          id: accountData.accountId,
          name: {
            ar: accountData.accountName,
            en: accountData.accountNameLatin,
          },
          is_sub_account: accountData.isSubAccount,
          main_account_id: accountData.mainAccount || null,
          is_active: accountData.isActive,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
