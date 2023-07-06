import React, { FC, useContext, useEffect, useState } from 'react';
import { NotificationProps } from './Notification.props';
import styles from './Notification.module.css';
import cn from 'classnames';
import { Portal } from '../../portal';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { NotificationContext } from '../../context/notification.context';

export const Notification: FC<NotificationProps> = ({ className, ...props }): JSX.Element | null => {
  const { notificationParams, isOpened, setIsOpened } = useContext(NotificationContext);
  const [position, setPosition] = useState({
    right: 20,
    bottom: 20,
  });

  const closeNotification = () => {
    setIsOpened && setIsOpened(false);
  };

  useEffect(() => {
    if (isOpened) {
      const timerId = setTimeout(closeNotification, 4000);
      return () => clearTimeout(timerId);
    }
  }, [isOpened]);

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