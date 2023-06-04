import React from 'react';
import { HrProps } from './Hr.props';
import styles from './Hr.module.css';
import cn from 'classnames';

export const Hr = ({ className, ...props }: HrProps): JSX.Element => {
  return (
    <hr className={cn(styles.hr, className)} {...props} />
  );
};