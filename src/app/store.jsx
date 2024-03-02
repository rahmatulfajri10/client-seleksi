import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authslice";
import { thunk } from "redux-thunk";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
