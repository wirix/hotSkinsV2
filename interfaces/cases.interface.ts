export interface ICaseInfo {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  skins: Skin[];
}

export interface Skin {
  skinId: number;
  color: string;
  type: string;
  skinTitle: string;
  skinItems: SkinItem[];
}

export interface SkinItem {
  StatTrak: boolean;
  property: string;
  image: string;
  price: number;
}

export interface ICasesList {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
}