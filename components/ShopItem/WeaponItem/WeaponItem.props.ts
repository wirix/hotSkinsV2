import { DetailedHTMLProps, HTMLAttributes } from "react";
import { TypeProperty, Typecolor, csgoItem, shopData } from "../../../interfaces/items.interface";

export interface WeaponItemProps extends csgoItem, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  color: Typecolor;
  property: TypeProperty;
  stared?: boolean;
  onClickBuyItem: (inventory: shopData, newItem: csgoItem, uid: string) => void;
}