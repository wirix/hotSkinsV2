import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Typecolor } from "../../interfaces/items.interface";

export interface CaseCoverProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  urlImg: string;
  caseId: number;
  color: Typecolor;
  price: number;
  type: 'case' | 'capsule';
}