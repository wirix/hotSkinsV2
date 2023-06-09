import { DetailedHTMLProps, HTMLAttributes } from "react";
import { TypeProperty, Typecolor, csgoItem, shopData } from "../../interfaces/items.interface";

export interface UniversalItemProps extends csgoItem, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  color: Typecolor;
  stared: boolean;
  property?: TypeProperty;
  buyItem?: (newItem: csgoItem, uid: string) => void;
  sellItem?: (item: csgoItem, uid: string) => void;
  saved: number[];
  inventory: shopData;
}