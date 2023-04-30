import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

export interface CheckboxProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isChoose: boolean;
}