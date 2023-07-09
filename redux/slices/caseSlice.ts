import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ICaseInfo } from '../../interfaces/cases.interface';
import { apiUrls } from '../../api/apiUrls';

interface CasesState {
  caseInfo: ICaseInfo | null;
  status: 'loading' | 'success' | 'error';
}

export const fetchCaseInfo = createAsyncThunk(
  'cases/fetchCaseInfo',
  async (id: number) => {
    const { data: caseInfo } = await axios.get<ICaseInfo>(apiUrls.case.getCaseDataById(id));
    return caseInfo;
  }
);

const initialState: CasesState = {
  caseInfo: null,
  status: 'loading',
};

const caseSlice = createSlice({
  name: 'case',
  initialState,
  reducers: {
    setCaseInfo: (state, action: PayloadAction<ICaseInfo>) => {
      state.caseInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCaseInfo.pending, (state) => {
        state.status = 'loading';
        state.caseInfo = null;
      })
      .addCase(fetchCaseInfo.fulfilled, (state, action: PayloadAction<ICaseInfo>) => {
        state.status = 'success';
        state.caseInfo = action.payload;
      })
      .addCase(fetchCaseInfo.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { reducer: caseReducer, actions: caseActions } = caseSlice;