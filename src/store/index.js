import { configureStore } from "@reduxjs/toolkit";
import calculatorReduser from "Store/slices/calculatorSlice.js";
import themeReduser from "Store/slices/themeSlice.js";

export default configureStore({
  reducer: {
    calculator: calculatorReduser,
    theme: themeReduser,
  },
});
