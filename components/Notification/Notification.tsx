import React, { useState } from 'react';
import styles from './Notification.module.css';
import { NotificationProps } from './Notification.props';
import cn from 'classnames';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

export const Notification = ({ message, type }: NotificationProps) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(!show);
  };

  return (
    <>
      {show && (
        <div
          className={cn(styles.notification, {
            [styles.success]: type === 'success',
            [styles.error]: type === 'error'
          })}
        >
          <p>{message}</p>
          <ButtonIcon icon='close' onClick={handleClose} />
        </div>
      )}
    </>
  );
};