import React from 'react';
import cn from 'classnames';
import styles from './Input.module.css';
import { InputProps } from './Input.props';

export const Input = ({ appearance = 'transparent', className, ...props }: InputProps): JSX.Element => {
  return (
    <input
      className={cn(styles.input, className, {
        [styles.black]: appearance === 'black',
        [styles.transparent]: appearance === 'transparent'
      })}
      {...props}
    />
  );
};