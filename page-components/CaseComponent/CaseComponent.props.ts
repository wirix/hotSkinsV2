import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CaseComponentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  idCase: number;
}