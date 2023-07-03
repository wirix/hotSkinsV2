import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ICaseInfo, ICasesList } from '../../interfaces/cases.interface';

interface CasesState {
  casesList: ICasesList[];
  caseInfo: ICaseInfo[];
  status: 'loading' | 'success' | 'error';
}

export const fetchCasesList = createAsyncThunk(
  'cases/fetchCasesList',
  async () => {
    const { data: cases } = await axios.get<ICasesList[]>(process.env.NEXT_PUBLIC_DOMAIN + 'cases');
    return cases;
  }
);

export const fetchCaseInfo = createAsyncThunk(
  'cases/fetchCaseInfo',
  async (id) => {
    const { data: caseInfo } = await axios.get<ICaseInfo[]>(process.env.NEXT_PUBLIC_DOMAIN + `case/${id}`);
    return caseInfo;
  }
);

const initialState: CasesState = {
  casesList: [],
  caseInfo: [],
  status: 'loading',
};

const casesSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {
    setCasesList: (state, action: PayloadAction<ICasesList[]>) => {
      state.casesList = action.payload;
    },
    setCaseInfo: (state, action: PayloadAction<ICaseInfo[]>) => {
      state.caseInfo = action.payload;
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
    builder
      .addCase(fetchCaseInfo.pending, (state) => {
        state.status = 'loading';
        state.caseInfo = [];
      })
      .addCase(fetchCaseInfo.fulfilled, (state, action: PayloadAction<ICaseInfo[]>) => {
        state.status = 'success';
        state.caseInfo = action.payload;
      })
      .addCase(fetchCaseInfo.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { reducer: casesReducer, actions: casesActions } = casesSlice;