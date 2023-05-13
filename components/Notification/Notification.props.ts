import { DetailedHTMLProps, HTMLAttributes } from "react";
import { typeMessage } from "../../context/notification.context";

export interface NotificationProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  message: string;
  type: typeMessage;
}