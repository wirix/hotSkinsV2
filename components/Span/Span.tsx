import React from 'react';
import { SpanProps } from './Span.props';
import styles from './Span.module.css';
import cn from 'classnames';

export const Span = ({ children, isHover = false, color = 'gray', fontSize = '16px', fontWeight = '400', className, ...props }: SpanProps): JSX.Element => {
  return (
    <span className={cn(className, styles.span, {
      [styles.isHover]: isHover,
      [styles.gray]: color === 'gray',
      [styles.white]: color === 'white',
      [styles.green]: color === 'green',
      [styles.red]: color === 'red',
      [styles.fontWeight200]: fontWeight === '200',
      [styles.fontWeight300]: fontWeight === '300',
      [styles.fontWeight400]: fontWeight === '400',
      [styles.fontWeight500]: fontWeight === '500',
      [styles.fontWeight700]: fontWeight === '700',
      [styles.fontWeight900]: fontWeight === '900',
      [styles.fontSize12]: fontSize === '12px',
      [styles.fontSize14]: fontSize === '14px',
      [styles.fontSize16]: fontSize === '16px',
      [styles.fontSize40]: fontSize === '40px'
    })} {...props}>
      {children}
    </span>
  );
};