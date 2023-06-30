import React, { FC } from 'react';
import { HrProps } from './Hr.props';
import styles from './Hr.module.css';
import cn from 'classnames';

export const Hr: FC<HrProps> = ({ className, ...props }) => {
  return (
    <hr className={cn(styles.hr, className)} {...props} />
  );
};