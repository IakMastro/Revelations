import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Image                        from "../../interfaces/Image";

export interface ImageSlice {
  columnDefs: Object[];
  currentImage?: Image;
}

const initialState: ImageSlice = {
  columnDefs: [
    {
      headerName: "Machine",
      field: "tags",
      sortable: "true"
    }
  ],
  currentImage: undefined
}

export const imageSlice = createSlice(
  {
    name: 'image',
    initialState,
    reducers: {
      setCurrentImage: (state, action: PayloadAction<Image | undefined>) => {
        state.currentImage = action.payload;
      }
    }
  }
)

export default imageSlice.reducer;
export const { setCurrentImage } = imageSlice.actions;