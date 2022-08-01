import {createSlice}        from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import Container            from "../../interfaces/Container";

export interface ContainerSlice {
  currentContainer?: Container;
}

const initialState: ContainerSlice = {
  currentContainer: undefined
};

export const containerSlice = createSlice(
  {
    name: 'container',
    initialState,
    reducers: {
      setCurrentContainer: (state, action: PayloadAction<Container | undefined>) => {
        state.currentContainer = action.payload;
      }
    }
  }
);

export default containerSlice.reducer;
export const { setCurrentContainer } = containerSlice.actions;