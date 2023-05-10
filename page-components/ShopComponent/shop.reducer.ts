import { IShopItem, ShopEnum } from "../../interfaces/shop.interface";

export interface ShopReducerState {
  shopItems: IShopItem[]
}

export type ShopActions = { type: ShopEnum.priceDown } | { type: ShopEnum.priceUp } | { type: ShopEnum.RareDown } | { type: ShopEnum.RareUp };

export const shopReducer = (state: ShopReducerState, action: ShopActions) => {
  switch (action.type) {
    case ShopEnum.priceDown:
      return {
        shopItems: state.shopItems.sort((a, b) => a.price < b.price ? 1 : -1)
      };
    default:
      throw new Error('Нет такой категории');
  }
};