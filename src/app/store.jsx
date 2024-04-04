import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authslice";
import { thunk } from "redux-thunk";
import questionReducer from "../features/questionSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, questionReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: persistedReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
export const persistor = persistStore(store);
