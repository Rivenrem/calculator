import { createSlice } from "@reduxjs/toolkit";

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState: {
    inputValue: "0",
    history: "",
  },
  reducers: {
    setInputValue: (state, action) => {
      state.inputValue === "0"
        ? (state.inputValue = action.payload)
        : (state.inputValue += action.payload);
    },

    cleanInputValue: (state) => {
      state.inputValue = "";
    },

    setHistory: (state) => {
      state.history = state.inputValue;
    },

    cleanHistory: (state) => {
      state.history = [];
    },
  },
});

export const { setInputValue, cleanInputValue, setHistory, cleanHistory } =
  calculatorSlice.actions;

export default calculatorSlice.reducer;
