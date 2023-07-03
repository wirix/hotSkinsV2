import React, { FC, useState } from 'react';
import styles from './SkinCard.module.css';
import cn from 'classnames';
import { SkinCardProps } from './SkinCard.props';

export const SkinCard: FC<SkinCardProps> = ({ color, width = 180, urlImg, borderRadius = '0px', height = 'auto', className, ...props }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return isImageLoaded
    ? (
      <div style={{ width, height, borderRadius }} className={cn(styles.SkinCard, className)} {...props}>
        <div className={cn(styles.circleShadow, {
          [styles.blue]: color === 'blue',
          [styles.purple]: color === 'purple',
          [styles.pink]: color === 'pink',
          [styles.red]: color === 'red',
          [styles.gold]: color === 'gold'
        })}></div>
        <span>
          <img width={width - 10} src={urlImg} alt="" />
        </span>
      </div>
    )
    : (
      <img width={width - 10} height={height} onLoad={() => handleImageLoad()} src={urlImg} alt="" />
    );
};