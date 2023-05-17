import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import accountSlice from './slices/accountSlice';
import intentorySlice from './slices/inventorySlice';
import shopSlice from './slices/shopSlice';

const store = configureStore({
  reducer: {
    account: accountSlice,
    inventory: intentorySlice,
    shop: shopSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;