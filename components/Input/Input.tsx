import React, { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';
import styles from './Input.module.css';
import { InputProps } from './Input.props';
import { Span } from '../Span/Span';

export const Input = forwardRef(({ appearance = 'transparent', error, className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  return (
    <div className={styles.inputContainer}>
      <input
        className={cn(styles.input, className, {
          [styles.black]: appearance === 'black',
          [styles.transparent]: appearance === 'transparent',
          [styles.activeError]: error,
          [styles.notActiveError]: !error
        })}
        ref={ref}
        {...props}
      />
      {error && <Span color='red' className={styles.span} fontSize='14px'>{error.message}</Span>}
    </div>
  );
});