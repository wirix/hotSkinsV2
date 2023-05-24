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
      state.inventory.weapon = action.payload.weapon;
      // state.inventory.graffiti = action.payload.graffiti;
      // state.inventory.sticker = action.payload.sticker;
    }
  }
});

export const { setDataInventory } = inventorySlice.actions;
export default inventorySlice.reducer;