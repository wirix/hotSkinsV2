import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { shopData } from '../../interfaces/items.interface';

interface ShopState {
  shop: shopData;
}

const initialState: ShopState = {
  shop: {
    weapon: [],
    graffiti: [],
    sticker: [],
  }
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setDataShop: (state, action: PayloadAction<shopData>) => {
      state.shop = action.payload;
    }
  }
});

export const { setDataShop } = shopSlice.actions;
export default shopSlice.reducer;