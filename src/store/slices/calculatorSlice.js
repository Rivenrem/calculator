import { createSlice } from "@reduxjs/toolkit";

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState: {
    history: [],
  },
  reducers: {
    setHistory: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const { setHistory } = calculatorSlice.actions;

export default calculatorSlice.reducer;
