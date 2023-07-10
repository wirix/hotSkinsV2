import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { csgoItem, shopData } from '../../interfaces/items.interface';
import { TypeSidebarCategoryItem } from '../../layouts/MainLayout/Sidebar/Sidebar.props';
import axios from 'axios';
import { flattenArrayOfObject } from '../../helpers/helpers';
import { apiUrls } from '../../constants/apiUrls';

export type sortedType = 'none' | 'saved';

interface ShopState {
  shop: csgoItem[];
  currentCategory: TypeSidebarCategoryItem;
  saved: number[];
  currentSorted: sortedType;
  loading: boolean;
}

export const fetchShopItems = createAsyncThunk(
  'shop/fetchItems',
  async () => {
    const { data: shopData } = await axios.get<shopData>(apiUrls.shop.getShopData);
    return shopData;
  }
);

const initialState: ShopState = {
  shop: [],
  currentCategory: 'all',
  saved: [],
  currentSorted: 'none',
  loading: true
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setDataShop: (state, action: PayloadAction<csgoItem[]>) => {
      state.shop = action.payload || [];
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopItems.pending, (state) => {
        state.loading = true;
        state.shop = [];
      })
      .addCase(fetchShopItems.fulfilled, (state, action) => {
        state.shop = flattenArrayOfObject(action.payload[0]);
        state.loading = false;
      })
      .addCase(fetchShopItems.rejected, (state) => {
        console.error('error loading shop items');
        state.loading = false;
      });
  },
});

export const { reducer: shopReducer, actions: shopActions } = shopSlice;