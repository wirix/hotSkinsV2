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
  luckyChance: 0,
  isAuth: false
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setDataAccount: (state, action: PayloadAction<AccountState>) => {
      state.balance = action.payload.balance;
      state.uid = action.payload.uid;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.luckyChance = action.payload.luckyChance;
      state.isAuth = true;
    }
  },
});

export const { setDataAccount } = accountSlice.actions;
export default accountSlice.reducer;