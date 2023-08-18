import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { NotificationProps } from './Notification.props';
import styles from './Notification.module.css';
import cn from 'classnames';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { NotificationContext } from '../../context/notification.context';
import { Portal } from '../../portal/Portal';

export const Notification: FC<NotificationProps> = ({ className, ...props }): JSX.Element | null => {
  const { notificationParams } = useContext(NotificationContext);
  const [isOpened, setIsOpened] = useState(false);
  const [position, setPosition] = useState({
    right: 20,
    bottom: 20,
  });

  const closeNotification = useCallback(() => {
    setIsOpened(false);
  }, []);

  useEffect(() => {
    if (!notificationParams.text) {
      return;
    }
    setIsOpened(true);
    const timerId = setTimeout(closeNotification, 4000);
    return () => clearTimeout(timerId);
  }, [notificationParams]);

  if (!setIsOpened) {
    return null;
  }

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
              <h3 className={styles.headText}>{notificationParams.headText}</h3>
              <ButtonIcon icon='close' onClick={() => closeNotification()} />
            </div>
            <span>{notificationParams.text}</span>
          </div>
        </div>
      </Portal>)
    : null;
};