import React from 'react';
import cn from 'classnames';
import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import Arrow from './arrow.svg';

export const Button = ({ children, arrow = 'none', appearance = 'transparent', className, ...props }: ButtonProps): JSX.Element => {
  return (
    <button className={cn(styles.button, className, {
      [styles.black]: appearance === 'black',
      [styles.darkBlue]: appearance === 'darkBlue',
      [styles.green]: appearance === 'green',
      [styles.transparent]: appearance === 'transparent'
    })} {...props}>
      <span className={styles.content}>
        {children}
         {arrow !== 'none' &&
        <span className={cn(styles.arrow, {
          [styles.up]: arrow === 'up',
          [styles.down]: arrow === 'down'
        })}>
          <Arrow />
        </span>
      }
      </span>
     
    </button>
  );
};