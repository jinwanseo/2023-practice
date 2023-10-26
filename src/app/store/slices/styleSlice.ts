import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface StyleSliceType {
  value: number;
}

const initialState = {
  value: sessionStorage.getItem("value") ?? 0,
} as StyleSliceType;

export const styleSlice = createSlice({
  name: "style",
  initialState,
  reducers: {
    setStoreValue: (state, action: PayloadAction<number>) => {
      sessionStorage.setItem("value", JSON.stringify(action.payload));
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStoreValue } = styleSlice.actions;

export default styleSlice.reducer;
