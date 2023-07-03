import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SkinCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  urlImg: string;
  color: 'blue' | 'purple' | 'pink' | 'red' | 'gold';
  borderRadius?: '0px' | '10px';
  width?: number;
  height?: number | 'auto';
}