export interface IWeaponItem {
  title: string;
  type: 'weapon';
  price: number;
  urlImg: string;
  color: 'blue' | 'purple' | 'pink' | 'red' | 'gold';
  skinId: string;
  property: 'Factory New' | 'Minimal Wear' | 'Field-Tested' | 'Well-Worn' | 'Battle-Scarred';
}

export interface IStickerItem {
  color: 'blue' | 'purple' | 'pink' | 'red';
  urlImg: string;
  skinId: string;
  title: string;
  type: 'sticker';
  price: number;
}

export interface IGraffitiItem {
  color: 'blue' | 'purple' | 'pink';
  urlImg: string;
  skinId: string;
  title: string;
  type: 'graffiti';
  price: number;
}

export type TypeAllItems = (IWeaponItem | IStickerItem | IGraffitiItem);