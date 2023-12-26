import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "layout",
  initialState: {
    collapsed: false,
    headerText: "Home",
  },
  reducers: {
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
    setHeaderText: (state, action) => {
      state.headerText = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCollapsed, setHeaderText } = slice.actions;

// Get value from state
export const layoutStore = (state) => state.layout;

export default slice.reducer;
