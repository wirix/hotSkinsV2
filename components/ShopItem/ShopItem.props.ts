import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ShopItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  type: string;
  price: number;
  urlImg: string;
  color: 'blue' | 'purple' | 'pink' | 'red' | 'gold';
  skinId: number;
  property: 'Factory New' | 'Minimal Wear' | 'Field-Tested' | 'Well-Worn' | 'Battle-Scarred';
  // при получении магазина, прогоняем каждый айтем, если на нашем аккуаунте он в избранном, ставим true
  stared?: boolean;
}