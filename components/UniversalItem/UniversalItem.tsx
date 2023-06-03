import React from 'react';
import styles from './UniversalItem.module.css';
import cn from 'classnames';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { Span } from '../Span/Span';
import Money from './money.svg';
import { ImgWithSkin } from '../ImgWithSkin/ImgWithSkin';
import { Button } from '../Button/Button';
import { UniversalItemProps } from './UniversalItem.props';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateSavedUserData } from '../../firebase';

export const UniversalItem = ({ title, urlImg, skinId, property, price, type, stared = false, color, buyItem, sellItem, timebuy, className, ...props }: UniversalItemProps): JSX.Element => {

  const uid = useSelector((state: RootState) => state.account.uid);
  const inventory = useSelector((state: RootState) => state.inventory.inventory);
  const saved = useSelector((state: RootState) => state.shop.saved);

  const onClickSendStar = (id: number) => {
    console.log('новый', id)
    console.log(saved ? [...saved, id].filter(savedId => savedId !== id) : [id])
    const newSaved = saved ? [...saved, id].filter(savedId => savedId !== id) : [id];
    updateSavedUserData(uid, newSaved);
    // ф-ия которая меняет stared на противоположный !stared
  };

  const onClickBuyItem = () => {
    buyItem && buyItem(inventory, property
      ? { title, urlImg, skinId, price, type, color, property, timebuy }
      : { title, urlImg, skinId, price, type, color, timebuy }, uid);
  };

  const onClickSellItem = () => {
    timebuy && sellItem && sellItem(property
      ? { title, urlImg, skinId, price, type, color, property, timebuy }
      : { title, urlImg, skinId, price, type, color, timebuy }, timebuy, uid);
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
          onClick={() => onClickSendStar(skinId)}
        />
      </div>
      <Span className={styles.title} fontWeight='500' color='white'>
        {title} {property && <Span color='white'>({property})</Span>}
      </Span>
      <Span className={styles.type} fontWeight='300'>
        {type}
      </Span>
      <Span>
        <Button
          className={styles.price}
          appearance={'green'}
          onClick={() => buyItem ? onClickBuyItem() : sellItem ? onClickSellItem() : null}
        >
          <Span fontSize={'14px'} color={'white'} className={styles.buyText} >{buyItem ? 'Купить' : sellItem ? 'Продать' : null}</Span>
          <Span fontSize={'14px'} color={'white'} className={styles.priceText} >{price}</Span>
          <Money />
        </Button>
      </Span>
    </div>
  );
};