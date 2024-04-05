import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  AuthStateInterface,
  userInfoInterface,
} from "../../../utils/interfaces";
import { registerUser, userLogin } from "./authActions";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";

const userToken = hasCookie("userToken") ? getCookie("userToken") : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
} as AuthStateInterface;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      deleteCookie("userToken");
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload.data;
    },
    updateUserInfo: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state.userInfo![key] = payload[key];
      });
    },
    pushRecipe: (state, { payload }) => {
      state.userInfo!.recipes = [...state.userInfo!.recipes, payload];
    },
    pullRecipe: (state, { payload }: PayloadAction<string>) => {
      state.userInfo = {
        ...(state.userInfo as userInfoInterface),
        recipes: state.userInfo!.recipes.filter(
          (recipe: string) => recipe != payload,
        ),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      userLogin.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.userInfo = payload.data;
        state.userToken = userToken;
      },
    );

    builder.addCase(
      userLogin.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.loading = false;
        state.error = payload.error;
      },
    );

    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(
      registerUser.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.loading = false;
        state.error = payload;
      },
    );
  },
});

export const {
  logout,
  updateUserInfo,
  setCredentials,
  pullRecipe,
  pushRecipe,
} = authSlice.actions;

export default authSlice.reducer;
