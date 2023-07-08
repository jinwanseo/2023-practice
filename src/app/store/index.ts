import { configureStore } from "@reduxjs/toolkit";
import etcSlice from "./etcStore";

export const store = configureStore({
  reducer: {
    etc: etcSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
