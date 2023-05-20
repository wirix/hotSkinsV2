import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { csgoItem } from '../../interfaces/items.interface';

interface InventoryState {
  inventory: csgoItem[];
}

const initialState: InventoryState = {
  inventory: [],
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setDataInventory: (state, action: PayloadAction<csgoItem[]>) => {
      state.inventory = action.payload;
    }
  }
});

export const { setDataInventory } = inventorySlice.actions;
export default inventorySlice.reducer;