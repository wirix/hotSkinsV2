import { DetailedHTMLProps, HTMLAttributes } from "react";
import { TypeProperty, Typecolor, csgoItem, shopData } from "../../interfaces/items.interface";

export interface UniversalItemProps extends csgoItem, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  color: Typecolor;
  stared?: boolean;
  property?: TypeProperty;
  buyItem?: (inventory: shopData, newItem: csgoItem, uid: string) => void;
  sellItem?: (sellItem: csgoItem, timebuy: number, uid: string) => void;
}