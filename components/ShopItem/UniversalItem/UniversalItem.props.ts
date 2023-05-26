import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Typecolor, csgoItem, shopData } from "../../../interfaces/items.interface";

export interface UniversalItemProps extends Omit<csgoItem, 'property'>, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  color: Typecolor;
  stared?: boolean;
  onClickBuyItem: (inventory: shopData, newItem: csgoItem, uid: string) => void
}