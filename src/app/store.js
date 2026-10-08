import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "./storage.js";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { baseApi } from "./baseApi.js";
import ecoReducer from "../features/eco/ecoSlice.js";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  eco: ecoReducer,
});

const persistConfig = {
  key: "ecoscan_root",
  storage,
  whitelist: ["eco"],
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getMiddleware) =>
    getMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
  devTools: (typeof import.meta !== "undefined" && import.meta.env?.DEV) ?? true,
});

export default store;
export const persistor = persistStore(store);
setupListeners(store.dispatch);
