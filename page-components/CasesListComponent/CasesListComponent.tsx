import React, { useContext } from 'react';
import { NotificationContext } from '../../context/notification.context';

export const CasesListComponent = (): JSX.Element => {
  const {setIsOpened, } = useContext(NotificationContext);
  return (
    <div onClick={() => setIsOpened && setIsOpened(true)}>
      <span>кейсы</span>
    </div>
  );
};