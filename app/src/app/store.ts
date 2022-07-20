import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import containerReducer                      from "../components/Home/containerSlice";
import imageReducer                          from "../components/Images/imageSlice";

export const store = configureStore(
  {
    reducer: {
      containers: containerReducer,
      images: imageReducer
    },
  });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;
