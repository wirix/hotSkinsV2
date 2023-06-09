import { DetailedHTMLProps, ForwardedRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> { 
  appearance?: 'transparent' | 'black';
  error?: FieldError;
  ref?: ForwardedRef<HTMLInputElement>
}