import React from 'react';
import cn from 'classnames';
import styles from './ButtonIcon.module.css';
import { ButtonIconProps, icons } from './ButtonIcon.props';

export const ButtonIcon = ({ icon, shape = 'none', appearance = 'transparent', className, ...props }: ButtonIconProps): JSX.Element => {
  const IconComp = icons[icon];
  return (
    <button className={cn(styles.buttonIcon, className, {
      [styles.circle]: shape === 'circle',
      [styles.transparent]: appearance === 'transparent',
      [styles.black]: appearance === 'black',
      [styles.darkBlue]: appearance === 'darkBlue',
    })} {...props}>
      <IconComp />
    </button>
  );
};