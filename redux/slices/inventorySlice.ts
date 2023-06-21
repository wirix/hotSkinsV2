import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { shopData } from '../../interfaces/items.interface';

interface InventoryState {
  inventory: shopData;
}

const initialState: InventoryState = {
  inventory: {
    weapon: [],
    graffiti: [],
    sticker: []
  },
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setDataInventory: (state, action: PayloadAction<shopData>) => {
      const { graffiti = [], sticker = [], weapon = [] } = action.payload || {};
      state.inventory.graffiti = graffiti;
      state.inventory.sticker = sticker;
      state.inventory.weapon = weapon;
    }
  }
});

export const { reducer: inventoryReducer, actions: inventoryAction } = inventorySlice;