import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import filter from './filter.svg';
import star from './star.svg';
import settings from './settings.svg';
import bell from './bell.svg';
import arrow from './arrow.svg';
import menu from './menu.svg';
import close from './close.svg';
import search from './search.svg';
import money from './money.svg';

export const icons = {
  filter,
  star,
  settings,
  bell,
  arrow,
  menu,
  close,
  search,
  money,
};

type IconName = keyof typeof icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  icon: IconName;
  shape?: 'circle' | 'square' | 'none';
  appearance?: 'black' | 'darkBlue' | 'transparent';
}