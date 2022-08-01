import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Image                        from "../../interfaces/Image";

export interface ImageSlice {
  currentImage?: Image;
}

const initialState: ImageSlice = {
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