import {createSlice}        from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import Container            from "../../interfaces/Container";

export interface ContainerSlice {
  columnDefs: Object[];
  currentContainer?: Container;
}

const initialState: ContainerSlice = {
  columnDefs: [
    // {
    //   headerName: "ID",
    //   field: 'id',
    //   filter: 'true'
    // },
    {
      headerName: "Names",
      field: 'names',
      sortable: "true",
      filter: 'true'
    },
    {
      headerName: "State",
      field: "state",
      sortable: "true",
      filter: "true"
    }
  ],
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