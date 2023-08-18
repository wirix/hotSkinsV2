import { ReactNode, createContext, useCallback, useState } from "react";

export type TypeMessage = 'success' | 'error';

export enum EnumHeadText {
  SUCCESS = 'Успешно',
  ERROR = 'Ошибка',
  NOTIFICATION = 'Уведомление'
}

interface INotificationParams {
  typeMessage: TypeMessage;
  text: string;
  headText: EnumHeadText;
}

export interface INotificationContext {
  notificationParams: INotificationParams;
  setNotificationParams?: (newNotificationParams: INotificationParams) => void;
}

export const NotificationContext = createContext<INotificationContext>({
  notificationParams: {
    typeMessage: 'success',
    text: '',
    headText: EnumHeadText.NOTIFICATION,
  }
});

export const NotificationProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [notificationParamsState, setNotificationParamsState] = useState<INotificationParams>({
    typeMessage: 'success',
    text: '',
    headText: EnumHeadText.NOTIFICATION
  });
  
  const setNotificationParams = useCallback((newNotificationParams: INotificationParams) => {
    setNotificationParamsState(newNotificationParams);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notificationParams: notificationParamsState,
        setNotificationParams
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
