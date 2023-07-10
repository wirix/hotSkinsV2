import { DetailedHTMLProps, HTMLAttributes } from "react";
import { AuthType } from "../../page-components";

export interface AuthFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  typeAuth: AuthType;
  setTypeAuth: (newTypeAuth: AuthType) => void;
}