import { ReactNode, createContext, useState } from "react";

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
  isOpened: boolean;
  setIsOpened?: (newIsOpened: boolean) => void;
}

export const NotificationContext = createContext<INotificationContext>({
  notificationParams: {
    typeMessage: 'success',
    text: '',
    headText: EnumHeadText.NOTIFICATION,
  },
  isOpened: false
});

export const NotificationProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [notificationParamsState, setNotificationParamsState] = useState<INotificationParams>({
    typeMessage: 'success',
    text: '',
    headText: EnumHeadText.NOTIFICATION
  });
  const [isOpenedState, setIsOpenedState] = useState<boolean>(false);

  const setIsOpened = (isOpened: boolean) => {
    setIsOpenedState(isOpened);
  };

  const setNotificationParams = (newNotificationParams: INotificationParams) => {
    setNotificationParamsState(newNotificationParams);
    setIsOpenedState(true);
  };

  return (
    <NotificationContext.Provider
      value={{
        notificationParams: notificationParamsState,
        setNotificationParams,
        isOpened: isOpenedState,
        setIsOpened,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
