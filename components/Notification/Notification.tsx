import React, { FC, useContext, useEffect, useState } from 'react';
import { NotificationProps } from './Notification.props';
import styles from './Notification.module.css';
import cn from 'classnames';
import { Portal } from '../../portal';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { NotificationContext } from '../../context/notification.context';

export const Notification: FC<NotificationProps> = ({ className, ...props }): JSX.Element | null => {
  const [position, setPosition] = useState({
    right: 20,
    bottom: 20,
  });
  const { notificationParams, isOpened, setIsOpened } = useContext(NotificationContext);

  const closeNotification = () => {
    setIsOpened && setIsOpened(false);
  };

  useEffect(() => {
    if (isOpened) {
      const timerId = setTimeout(closeNotification, 4000);
      return () => clearTimeout(timerId);
    }
  }, [isOpened]);

  return isOpened
    ? (
      <Portal>
        <div
          className={cn(styles.tooltip, className, {
            [styles.redBg]: notificationParams.typeMessage === 'error',
            [styles.greenBg]: notificationParams.typeMessage === 'success'
          })}
          style={{ bottom: position.bottom, right: position.right }}
          {...props}
        >
          <div className={styles.tooltipContainer}>
            <div>
              <h3 className={styles.headText}>{notificationParams.headText ?? 'Уведомление'}</h3>
              <ButtonIcon icon='close' onClick={() => setIsOpened && setIsOpened(false)} />
            </div>
            <span>{notificationParams.text}</span>
          </div>
        </div>
      </Portal>)
    : null;
};