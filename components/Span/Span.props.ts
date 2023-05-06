import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface SpanProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>,HTMLSpanElement> {
  children: ReactNode;
  isHover?: boolean;
  color?: 'gray' | 'green' | 'white';
  fontSize?: '12px' | '14px' | '16px' | '40px';
  fontWeight?: '200' | '300' | '400' | '500' | '700' | '900';
}