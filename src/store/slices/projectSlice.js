import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "project",
  initialState: {
    dataProject: null,
  },
  reducers: {
    setDataProject: (state, action) => {
      state.dataProject = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDataProject } = slice.actions;

// Get value from state
export const projectStore = (state) => state.project;

export default slice.reducer;
