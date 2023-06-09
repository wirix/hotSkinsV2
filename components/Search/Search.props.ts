import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SearchProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: string;
  setValue: (value: string) => void;
  appearance?: 'transparent' | 'black';
  placeholder?: string;
}