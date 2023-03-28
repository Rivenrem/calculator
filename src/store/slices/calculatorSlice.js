import { createSlice } from "@reduxjs/toolkit";

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState: {
    history: [],
    showHistory: false,
  },
  reducers: {
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setShowHistory: (state) => {
      state.showHistory = !state.showHistory;
    },
  },
});

export const { setHistory, setShowHistory } = calculatorSlice.actions;

export default calculatorSlice.reducer;
