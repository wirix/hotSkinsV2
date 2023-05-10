export enum ShopEnum {
  priceUp,
  priceDown,
  RareUp,
  RareDown
}

export interface IShopItem {
  title: string;
  type: string;
  price: number;
  urlImg: string;
  color: 'blue' | 'purple' | 'pink' | 'red' | 'gold';
  skinId: number;
  property: 'Factory New' | 'Minimal Wear' | 'Field-Tested' | 'Well-Worn' | 'Battle-Scarred';
}