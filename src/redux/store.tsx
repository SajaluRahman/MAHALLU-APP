import { configureStore } from "@reduxjs/toolkit";
import complaintsReducer from "./complaints/FetchComplaints";

const store = configureStore({
  reducer: {
    complaints: complaintsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
