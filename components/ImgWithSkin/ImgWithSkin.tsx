import React, { FC, useState } from 'react';
import styles from './ImgWithSkin.module.css';
import cn from 'classnames';
import { ImgWithSkinProps } from './ImgWithSkin.props';

export const ImgWithSkin: FC<ImgWithSkinProps> = ({ color, width = 180, urlImg, height = 'auto', className, ...props }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return isImageLoaded
    ? (
      <div className={cn(styles.ImgWithSkin, className)} {...props}>
        <div className={cn(styles.circleShadow, {
          [styles.blue]: color === 'blue',
          [styles.purple]: color === 'purple',
          [styles.pink]: color === 'pink',
          [styles.red]: color === 'red',
          [styles.gold]: color === 'gold'
        })}></div>
        <img width={width} height={height} src={urlImg} alt="" />
      </div>
    )
    : (
      <img width={width} height={height} onLoad={() => handleImageLoad()} src={urlImg} alt="" />
    );
};