import { DetailedHTMLProps, ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  appearance?: 'black' | 'green' | 'darkBlue' | 'transparent';
  children: ReactNode;
  arrow?: 'up' | 'down' | 'none';
}