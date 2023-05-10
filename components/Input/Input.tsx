import React, { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';
import styles from './Input.module.css';
import { InputProps } from './Input.props';

export const Input = forwardRef(({ appearance = 'transparent', className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  return (
    <input
      className={cn(styles.input, className, {
        [styles.black]: appearance === 'black',
        [styles.transparent]: appearance === 'transparent'
      })}
      ref={ref}
      {...props}
    />
  );
});