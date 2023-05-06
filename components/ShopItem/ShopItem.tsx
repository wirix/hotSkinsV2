import React from 'react';
import { ShopItemProps } from './ShopItem.props';
import styles from './ShopItem.module.css';
import cn from 'classnames';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { Span } from '../Span/Span';
import Money from './money.svg';
import { ImgWithSkin } from '../ImgWithSkin/ImgWithSkin';

export const ShopItem = ({ title, urlImg, price, type, stared, color, className, ...props }: ShopItemProps): JSX.Element => {
  return (
    <div className={styles.shopItem}>
      <div className={cn(styles.img, className)} {...props}>
        <ImgWithSkin
          className={styles.imgWithSkin}
          urlImg={urlImg}
          color={color}
        />
        <ButtonIcon
          icon='star'
          shape='circle'
          appearance='black'
        />
      </div>
      <Span className={styles.title} fontWeight='500' color='white'>
        {title}
      </Span>
      <Span className={styles.type} fontWeight='300'>
        {type}
      </Span>
      <Span className={styles.price} color='white' fontWeight='300'>
        <Money />
        {price}
      </Span>
    </div>
  );
};