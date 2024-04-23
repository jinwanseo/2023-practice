import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface StyleSliceType {
  loading: boolean;
}

const initialState = {
  loading: false,
} as StyleSliceType;

export const styleSlice = createSlice({
  name: "style",
  initialState,
  reducers: {
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoadingState } = styleSlice.actions;

export default styleSlice.reducer;
