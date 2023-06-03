import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { shopData } from '../../interfaces/items.interface';
import { TypeSidebarCategoryItem } from '../../layouts/MainLayout/Sidebar/Sidebar.props';

interface ShopState {
  shop: shopData;
  currentCategory: TypeSidebarCategoryItem;
  saved: number[];
}

const initialState: ShopState = {
  shop: {
    weapon: [],
    graffiti: [],
    sticker: [],
  },
  currentCategory: 'all',
  saved: []
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
    }
  }
});

export const { setDataShop, setCurrentCategory, setSaved } = shopSlice.actions;
export default shopSlice.reducer;