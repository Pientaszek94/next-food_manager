import {
  BaseQueryApi,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import build from "next/dist/build";

const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://127.0.0.1:8000/api/v1"
    : process.env.NEXT_PUBLIC_API_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: backendURL,
    prepareHeaders: (headers, { getState }: { getState: () => any }) => {
      const token = getState().auth.userToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: (build) => ({
    getUserDetails: build.query({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
    }),
    deleteUser: build.mutation({
      query: () => ({
        url: "/users/disable",
        method: "PATCH",
      }),
    }),
    updateUser: build.mutation({
      query: (user) => ({
        url: "/users/update/singles",
        method: "PATCH",
        body: user,
      }),
    }),

    pushUserRecipes: build.mutation({
      query: (user) => ({
        url: "/users/update/pusharray",
        method: "PATCH",
        body: user,
      }),
    }),
    pullUserRecipes: build.mutation({
      query: (user) => ({
        url: "/users/update/pullarray",
        method: "PATCH",
        body: user,
      }),
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  usePushUserRecipesMutation,
  usePullUserRecipesMutation,
} = authApi;
