import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ImgWithSkinProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  urlImg: string;
  color: 'blue' | 'purple' | 'pink' | 'red' | 'gold';
  width?: number;
  height?: number | 'auto';
}