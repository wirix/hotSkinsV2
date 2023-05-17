import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TypeAllItems } from '../../interfaces/items.interface';

interface ShopState {
  shop: TypeAllItems[];
}

const initialState: ShopState = {
  shop: [],
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setDataShop: (state, action: PayloadAction<TypeAllItems[]>) => {
      state.shop = action.payload;
    }
  }
});

export const { setDataShop } = shopSlice.actions;
export default shopSlice.reducer;