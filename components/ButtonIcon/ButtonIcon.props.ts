import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import filter from './filter.svg';
import star from './star.svg';
import settings from './settings.svg';
import bell from './bell.svg';

export const icons = {
  filter,
  star,
  settings,
  bell,
};

type IconName = keyof typeof icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  icon: IconName;
  shape: 'circle' | 'none';
  appearance?: 'black' | 'darkBlue' | 'transparent';
}