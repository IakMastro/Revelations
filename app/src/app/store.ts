import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import containerReducer                      from "../components/Home/containerSlice";
import imageReducer                          from "../components/Images/imageSlice";
import buildReducer                          from "../components/Images/buildImageSlice";

export const store = configureStore(
  {
    reducer: {
      containers: containerReducer,
      images: imageReducer,
      buildImage: buildReducer
    },
  });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;
