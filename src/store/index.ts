import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import todosReducer from "./todosSlice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["todos"], // only persist the todos slice
};

const rootReducer = combineReducers({
  todos: todosReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);


// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;