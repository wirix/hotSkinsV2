import { ActionCreatorsMapObject, bindActionCreators, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { accountReducer } from './slices/accountSlice';
import { inventoryReducer } from './slices/inventorySlice';
import { shopReducer } from './slices/shopSlice';
import { useMemo } from 'react';
import { carouselReducer } from './slices/carouselSlice';
import { casesReducer } from './slices/casesSlice';

const store = configureStore({
  reducer: {
    account: accountReducer,
    inventory: inventoryReducer,
    shop: shopReducer,
    carousel: carouselReducer,
    cases: casesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useActionCreators = (actions: ActionCreatorsMapObject) => {
  const dispatch = useAppDispatch();
  return useMemo(() => bindActionCreators(actions, dispatch), []);
};

export default store;