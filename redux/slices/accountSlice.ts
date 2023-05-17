import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IAccount } from '../../interfaces/account.inteface';

interface AccountState extends IAccount { }

const initialState: AccountState = {
  balance: 0,
  uid: '',
  username: '',
  email: '',
  password: '',
  luckyChance: 0
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setDataAccount: (state, action: PayloadAction<AccountState>) => {
      state = {...action.payload};
    }
  },
});

export const { setDataAccount } = accountSlice.actions;
export default accountSlice.reducer;