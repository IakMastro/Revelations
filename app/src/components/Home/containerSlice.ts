import {createSlice}        from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import Container            from "../../interfaces/Container";

export interface ContainerSlice {
  columnDefs: Object[];
}

const initialState: ContainerSlice = {
  columnDefs: [
    {
      headerName: "ID",
      field: 'id',
      filter: 'true'
    },
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
};

export const containerSlice = createSlice(
  {
    name: 'container',
    initialState,
    reducers: {
    }
  }
);

export default containerSlice.reducer;