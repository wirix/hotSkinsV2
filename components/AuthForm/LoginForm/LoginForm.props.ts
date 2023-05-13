import { DetailedHTMLProps, HTMLAttributes } from "react";
import { typeMessage } from "../../../context/notification.context";

export interface LoginFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setType: (type: typeMessage) => void;
  setMessage: (message: string) => void;
}