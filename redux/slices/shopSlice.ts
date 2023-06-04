import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { shopData } from '../../interfaces/items.interface';
import { TypeSidebarCategoryItem } from '../../layouts/MainLayout/Sidebar/Sidebar.props';

export type sortedType = 'none' | 'saved';

interface ShopState {
  shop: shopData;
  currentCategory: TypeSidebarCategoryItem;
  saved: number[];
  currentSorted: sortedType;
}

const initialState: ShopState = {
  shop: {
    weapon: [],
    graffiti: [],
    sticker: [],
  },
  currentCategory: 'all',
  saved: [],
  currentSorted: 'none'
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setDataShop: (state, action: PayloadAction<shopData>) => {
      state.shop = action.payload;
    },
    setCurrentCategory: (state, action: PayloadAction<TypeSidebarCategoryItem>) => {
      state.currentCategory = action.payload;
    },
    setSaved: (state, action: PayloadAction<number[]>) => {
      state.saved = action.payload;
    },
    setCurrentSorted: (state, action: PayloadAction<sortedType>) => {
      state.currentSorted = action.payload;
    }
  }
});

export const { setDataShop, setCurrentCategory, setSaved, setCurrentSorted } = shopSlice.actions;
export default shopSlice.reducer;