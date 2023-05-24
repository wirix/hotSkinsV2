import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { shopData } from '../../interfaces/items.interface';
import { TypeSidebarTitleItem } from '../../layouts/MainLayout/Sidebar/Sidebar.props';

interface ShopState {
  shop: shopData;
  currentCategory: TypeSidebarTitleItem;
}

const initialState: ShopState = {
  shop: {
    weapon: [],
    graffiti: [],
    sticker: [],
  },
  currentCategory: 'all'
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setDataShop: (state, action: PayloadAction<shopData>) => {
      state.shop = action.payload;
    },
    setCurrentCategory: (state, action: PayloadAction<TypeSidebarTitleItem>) => {
      state.currentCategory = action.payload;
    }
  }
});

export const { setDataShop, setCurrentCategory } = shopSlice.actions;
export default shopSlice.reducer;