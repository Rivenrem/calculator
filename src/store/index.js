import { configureStore } from "@reduxjs/toolkit";
import calculatorReduser from "./slices/calculatorSlica.js";

export default configureStore({
  reducer: {
    calculator: calculatorReduser,
  },
});
