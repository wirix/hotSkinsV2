import React from 'react';
import styles from './Checkbox.module.css';
import CheckIcon from './check.svg';
import { CheckboxProps } from './Checkbox.props';
import cn from 'classnames';

export const Checkbox = ({ isChoose, className, ...props }: CheckboxProps) => {
  return (
    <div className={cn(styles.checkbox, isChoose, className, {
      [styles.isChoose]: isChoose,
      [styles.notChoose]: !isChoose
    })} {...props}>
      <CheckIcon />
    </div>
  );
};