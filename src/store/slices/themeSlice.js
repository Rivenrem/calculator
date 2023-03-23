import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    lightTheme: window.matchMedia("(prefers-color-scheme: light)").matches,
  },

  reducers: {
    setLightTheme: (state) => {
      state.lightTheme = true;
    },
    setDarkTheme: (state) => {
      state.lightTheme = false;
    },
    setDefaultTheme: (state) => {
      state.lightTheme = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;
    },
  },
});

export const { setLightTheme, setDarkTheme, setDefaultTheme } =
  themeSlice.actions;

export default themeSlice.reducer;
