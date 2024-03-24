import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./services/authService";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        [authApi.reducerPath]:authApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(authApi.middleware)
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch