import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import calculatorReduser from "Store/slices/calculatorSlice.js";
import themeReduser from "Store/slices/themeSlice.js";

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
});

export default configureStore({
  reducer: {
    calculator: calculatorReduser,
    theme: themeReduser,
  },
  middleware,
});
