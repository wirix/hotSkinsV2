import React from 'react';
import styles from './ShopItem.module.css';
import cn from 'classnames';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { Span } from '../Span/Span';
import Money from './money.svg';
import { ImgWithSkin } from '../ImgWithSkin/ImgWithSkin';
import { Button } from '../Button/Button';
import { ShopItemProps } from './ShopItem.props';

export const ShopItem = ({ title, skinId, property, urlImg, price, type, stared = false, color, className, ...props }: ShopItemProps): JSX.Element => {

  const onClickSendStar = () => {
    return;
    // ф-ия которая меняет stared на противоположный !stared
  };

  return (
    <div className={styles.shopItem}>
      <div className={cn(styles.img, className)} {...props}>
        <ImgWithSkin
          width={170}
          className={styles.imgWithSkin}
          urlImg={urlImg}
          color={color}
        />
        {/* при клике добавляем в databse firebase объект предмета */}
        <ButtonIcon
          icon='star'
          shape='circle'
          appearance='black'
          className={cn(styles.buttonStar, {
            [styles.starred]: stared,
            [styles.unstarred]: !stared,
          })}
          onClick={() => onClickSendStar()}
        />
      </div>
      <Span className={styles.title} fontWeight='500' color='white'>
        {title} (<Span color='white'>{property}</Span>)
      </Span>
      <Span className={styles.type} fontWeight='300'>
        {type}
      </Span>
      <Span>
        <Button
          className={styles.price}
          appearance={'green'}
        >
          <Span fontSize={'14px'} color={'white'} className={styles.buyText} >Купить</Span>
          <Span fontSize={'14px'} color={'white'} className={styles.priceText} >{price}</Span>
          <Money />
        </Button>
      </Span>
    </div>
  );
};