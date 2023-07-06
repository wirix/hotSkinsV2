import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ICasesList } from '../../interfaces/cases.interface';

interface CasesState {
  casesList: ICasesList[];
  status: 'loading' | 'success' | 'error';
}

export const fetchCasesList = createAsyncThunk(
  'cases/fetchCasesList',
  async () => {
    const { data: cases } = await axios.get<ICasesList[]>(process.env.NEXT_PUBLIC_DOMAIN + 'cases');
    return cases;
  }
);

const initialState: CasesState = {
  casesList: [],
  status: 'loading',
};

const casesSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {
    setCasesList: (state, action: PayloadAction<ICasesList[]>) => {
      state.casesList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCasesList.pending, (state) => {
        state.status = 'loading';
        state.casesList = [];
      })
      .addCase(fetchCasesList.fulfilled, (state, action: PayloadAction<ICasesList[]>) => {
        state.status = 'success';
        state.casesList = action.payload;
      })
      .addCase(fetchCasesList.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { reducer: casesReducer, actions: casesActions } = casesSlice;