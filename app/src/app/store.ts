import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import containerReducer                      from "../components/Home/containerSlice";

export const store = configureStore(
  {
    reducer: {
      containers: containerReducer
    },
  });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;
