import { TypeSidebarCategoryItem } from "../layouts/MainLayout/Sidebar/Sidebar.props";
import { TypeProperty, Typecolor } from "./items.interface";

export interface ICaseInfo {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  skins: Skin[];
}

export interface Skin {
  skinId: number;
  color: Typecolor;
  type: TypeSidebarCategoryItem;
  skinTitle: string;
  skinItems: SkinItem[];
}

export interface SkinItem {
  StatTrak: boolean;
  property: TypeProperty;
  image: string;
  price: number;
}

export interface ICasesList {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
}