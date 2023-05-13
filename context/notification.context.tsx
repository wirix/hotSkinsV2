import { PropsWithChildren, createContext, useState } from "react";


export const NotificationContext = createContext<INotificationContext>({
  message: '',
  type: 'error',
});

export const NotificationContextProvider = ({ children, message, type }: PropsWithChildren<INotificationContext>): JSX.Element => {
  const [messageState, setMessageState] = useState<string>(message);
  const [typeState, setTypeState] = useState<typeMessage>(type);

  const setMessage = (newMessage: string) => {
    setMessageState(newMessage);
  };

  const setType = (newType: typeMessage) => {
    setTypeState(newType);
  };

  return <NotificationContext.Provider value={{
    message: messageState,
    setMessage,
    type: typeState,
    setType,
  }}>
    {children}
  </NotificationContext.Provider>;
};

export interface INotificationContext {
  message: string;
  setMessage?: (message: string) => void;
  type: typeMessage;
  setType?: (type: typeMessage) => void;
}

export type typeMessage = 'success' | 'error';