import { ReactNode, createContext, useState } from "react";

export type TypeMessage = 'success' | 'error';
export type TypeHeadText = 'Уведомление' | 'Ошибка' | 'Успешно';

export interface INotificationContext {
  typeMessage: TypeMessage;
  setTypeMessage?: (newTypeMessage: TypeMessage) => void;
  text: string;
  setText?: (newText: string) => void;
  headText: TypeHeadText;
  setHeadText?: (newHeadText: TypeHeadText) => void;
  isOpened: boolean;
  setIsOpened?: (newIsOpened: boolean) => void;
}

export const NotificationContext = createContext<INotificationContext>({
  typeMessage: 'success',
  text: '',
  headText: 'Уведомление',
  isOpened: false
});

export const NotificationProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [typeMessageState, setTypeMessageState] = useState<TypeMessage>('success');
  const [textState, setTextState] = useState<string>('');
  const [isOpenedState, setIsOpenedState] = useState<boolean>(false);
  const [headTextState, setHeadTextState] = useState<TypeHeadText>('Уведомление');

  const setTypeMessage = (newTypeMessage: TypeMessage) => {
    setTypeMessageState(newTypeMessage);
    setIsOpenedState(true);
  };

  const setText = (newText: string) => {
    setTextState(newText);
    setIsOpenedState(true);
  };

  const setIsOpened = (isOpened: boolean) => {
    setIsOpenedState(isOpened);
  };

  const setHeadText = (newHeadText: TypeHeadText) => {
    setHeadTextState(newHeadText);
    setIsOpenedState(true);
  };

  return (
    <NotificationContext.Provider
      value={{ text: textState,
        typeMessage: typeMessageState,
        headText: headTextState,
        isOpened: isOpenedState,
        setTypeMessage,
        setText,
        setIsOpened,
        setHeadText
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

