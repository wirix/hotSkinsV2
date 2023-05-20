export interface shopData {
  weapon: csgoItem[];
  graffiti: csgoItem[];
  sticker: csgoItem[];
}

export interface csgoItem {
  skinId: number;
  color: Typecolor;
  type: string;
  title: string;
  urlImg: string;
  price: number;
  property?: TypeProperty;
}

export type Typecolor = 'blue' | 'purple' | 'pink' | 'red' | 'gold';
export type TypeProperty = 'Factory New' | 'Minimal Wear' | 'Field-Tested' | 'Well-Worn' | 'Battle-Scarred';