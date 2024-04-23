import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface etcState {
  currentPage: string | null;
}

const initialState: etcState = {
  currentPage: null,
};

export const etcSlice = createSlice({
  name: "etc",
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { incrementByAmount } = etcSlice.actions;
export default etcSlice.reducer;
