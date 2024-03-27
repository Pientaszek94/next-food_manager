import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisteringUserInterface } from "../../../utils/interfaces";
import axios from "axios";
import { setCookie } from "cookies-next";

const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://127.0.0.1:8000/"
    : process.env.NEXT_PUBLIC_API_URL;

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { name, email, password }: RegisteringUserInterface,
    { rejectWithValue },
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${backendURL}api/v1/users/`,
        { name, email, password },
        config,
      );
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: RegisteringUserInterface,
    { rejectWithValue },
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${backendURL}api/v1/users/login`,
        { email, password },
        config,
      );

      setCookie("userToken", data.data.token);

      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
