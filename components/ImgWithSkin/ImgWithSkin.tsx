import React from 'react';
import styles from './ImgWithSkin.module.css';
import cn from 'classnames';
import { ImgWithSkinProps } from './ImgWithSkin.props';

export const ImgWithSkin = ({ color, width = 180, urlImg, height = 'auto', className, ...props }: ImgWithSkinProps): JSX.Element => {
  return (
    <div className={cn(styles.ImgWithSkin, className)} {...props}>
      <div className={cn(styles.circleShadow, {
        [styles.blue]: color === 'blue',
        [styles.purple]: color === 'purple',
        [styles.pink]: color === 'pink',
        [styles.red]: color === 'red',
        [styles.gold]: color === 'gold'
      })}></div>
      {/* заменить на Image */}
      <img width={width} height={height} src={urlImg} alt="" />
    </div>
  );
};