import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CarouselType {
  width: number;
  height: number;
  swapNextItem: number;
  randomRange: number;
  timeTransition: number;
  idxPasteNewItem: number;
}

export type BigCarouselType = CarouselType & {
  width: 150;
  height: 124;
  swapNextItem: 0;
  randomRange: 145;
};

export type SmallCarouselType = CarouselType & {
  width: 99;
  height: 100;
  swapNextItem: -1;
  randomRange: 93;
};

export type IsOpeningType = 'notOpened' | 'opening' | 'opened';

interface CarouselState {
  isOpening: IsOpeningType;
  carouselParams: BigCarouselType | SmallCarouselType;
}

const initialState: CarouselState = {
  isOpening: 'notOpened',
  carouselParams: {
    width: 150,
    height: 124,
    swapNextItem: 0,
    randomRange: 145,
    timeTransition: 5,
    // увеличивает скорость прокрутки
    idxPasteNewItem: 30
  }
};

const carouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducers: {
    setBigCarousel: (state) => {
      state.carouselParams = {
        ...state.carouselParams,
        width: 150,
        height: 124,
        swapNextItem: 0,
        randomRange: 145,
      };
    },
    setSmallCarousel: (state) => {
      state.carouselParams = {
        ...state.carouselParams,
        width: 99,
        height: 100,
        swapNextItem: -1,
        randomRange: 93,
      };
    },
    setIsOpening: (state, action: PayloadAction<IsOpeningType>) => {
      state.isOpening = action.payload;
    }
  }
});

export const { reducer: carouselReducer, actions: carouselActions } = carouselSlice;