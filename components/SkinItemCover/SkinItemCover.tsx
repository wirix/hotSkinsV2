import React, { FC } from 'react';
import styles from './SkinItemCover.module.css';
import cn from 'classnames';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { Span } from '../Span/Span';
import Money from './money.svg';
import { SkinCard } from '../SkinCard/SkinCard';
import { Button } from '../Button/Button';
import { SkinItemCoverProps } from './SkinItemCover.props';
import { useStateSelector } from '../../redux/store';
import { updateSavedUserData } from '../../firebase/manager';
import { useRouter } from 'next/router';

export const SkinItemCover: FC<SkinItemCoverProps> = ({ title, urlImg, skinId, property, price, type, stared, color, buyItem, sellItem, timebuy, saved, className, ...props }) => {
  const { uid, balance } = useStateSelector(state => state.account);
  const router = useRouter();

  const onClickSendStar = (id: number) => {
    const newSaved = saved ? [...saved, id].filter((item, i, arr) => arr.indexOf(item) === i && arr.lastIndexOf(item) === i) : [id];
    updateSavedUserData(uid, newSaved);
  };

  const isBuyItem = () => {
    return balance < price && router.asPath === '/shop';
  };

  const onClickBuyItem = () => {
    buyItem && buyItem(property
      ? { title, urlImg, skinId, price, type, color, property, timebuy }
      : { title, urlImg, skinId, price, type, color, timebuy }, uid);
  };

  const onClickSellItem = () => {
    sellItem && sellItem(property
      ? { title, urlImg, skinId, price, type, color, property, timebuy }
      : { title, urlImg, skinId, price, type, color, timebuy }, uid);
  };

  return (
    <div className={styles.SkinItemCover}>
      <div className={cn(styles.img, className)} {...props}>
        <SkinCard
          borderRadius={'10px'}
          width={180}
          className={styles.SkinCard}
          urlImg={urlImg}
          color={color}
        />
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
          appearance={isBuyItem() ? 'darkBlue' : 'green'}
          onClick={() => router.asPath === '/shop' ? onClickBuyItem() : onClickSellItem()}
          disabled={isBuyItem()}
        >
          <Span fontSize={'14px'} color={'white'} className={styles.buyText} >{router.asPath === '/shop' ? 'Купить' : 'Продать'}</Span>
          <Span fontSize={'14px'} color={'white'} className={styles.priceText} >{price}</Span>
          <Money />
        </Button>
      </Span>
    </div>
  );
};