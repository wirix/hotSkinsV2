import React from 'react';
import styles from '../ShopItem.module.css';
import cn from 'classnames';
import { ButtonIcon } from '../../ButtonIcon/ButtonIcon';
import { Span } from '../../Span/Span';
import Money from '../money.svg';
import { ImgWithSkin } from '../../ImgWithSkin/ImgWithSkin';
import { Button } from '../../Button/Button';
import { UniversalItemProps } from './UniversalItem.props';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

export const UniversalItem = ({ title, urlImg, skinId, price, type, stared = false, color, onClickBuyItem, className, ...props }: UniversalItemProps): JSX.Element => {
  const uid = useSelector((state: RootState) => state.account.uid);
  const inventory = useSelector((state: RootState) => state.inventory.inventory);

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
        {title}
      </Span>
      <Span className={styles.type} fontWeight='300'>
        {type}
      </Span>
      <Span>
        <Button
          className={styles.price}
          appearance={'green'}
          onClick={() => onClickBuyItem(inventory, { title, urlImg, skinId, price, type, color }, uid)}
        >
          <Span fontSize={'14px'} color={'white'} className={styles.buyText} >Купить</Span>
          <Span fontSize={'14px'} color={'white'} className={styles.priceText} >{price}</Span>
          <Money />
        </Button>
      </Span>
    </div>
  );
};