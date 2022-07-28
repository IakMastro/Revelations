import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dataset}                    from "../../interfaces/Dataset";

export interface BuildImageSlice {
  code?: string;
  language?: string;
  dataset?: Dataset;
}

const initialState: BuildImageSlice = {
  code: undefined,
  language: undefined,
  dataset: undefined
}

export const buildImageSlice = createSlice(
  {
    name: 'buildImage',
    initialState,
    reducers: {
      setCode: ((state, action: PayloadAction<string>) => {
        state.code = action.payload;
      }),
      setDataset: ((state, action: PayloadAction<Dataset>) => {
        state.dataset = action.payload;
      }),
      setLanguage: ((state, action: PayloadAction<string>) => {
        state.language = action.payload;

        switch (state.language) {
          case 'py':
            state.code = `@lru_cache(2000)
@app.get("/")
async def default():
  return {"message": "It's morbin time"}
            `;
            break;
        }
      })
    }
  }
);

export default buildImageSlice.reducer;
export const {setCode, setLanguage, setDataset} = buildImageSlice.actions;