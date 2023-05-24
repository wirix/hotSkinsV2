import React from 'react';
import styles from '../ShopItem.module.css';
import cn from 'classnames';
import { ButtonIcon } from '../../ButtonIcon/ButtonIcon';
import { Span } from '../../Span/Span';
import Money from '../money.svg';
import { ImgWithSkin } from '../../ImgWithSkin/ImgWithSkin';
import { Button } from '../../Button/Button';
import { UniversalItemProps } from './UniversalItem.props';
import { updateInventoryUserData } from '../../../firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { shopData } from '../../../interfaces/items.interface';

export const UniversalItem = ({ title, urlImg, skinId, price, type, stared = false, color, className, ...props }: UniversalItemProps): JSX.Element => {
  const uid = useSelector((state: RootState) => state.account.uid);
  const inventory = useSelector((state: RootState) => state.inventory.inventory);

  const onClickSendStar = () => {
    return;
    // ф-ия которая меняет stared на противоположный !stared
  };

  const onClickBuyItem = () => {
    // можно прикрутить магазин к firebase, тем самым удалять проданный эл-нт из магазина


    // баг с продажами разных категорий
    let newInventory: shopData = {
      weapon: [],
      graffiti: [],
      sticker: [],
    };
    switch (type) {
      case 'graffiti':
        newInventory = {
          ...inventory,
          graffiti: [...inventory.graffiti, { title, skinId, urlImg, price, type, color }]
        };
        break;
      case 'sticker':
        newInventory = {
          ...inventory,
          sticker: [...inventory.sticker, { title, skinId, urlImg, price, type, color }],
        };
        break;
      default:
        newInventory = { ...inventory };
    }
    console.log('newInventory', newInventory)
    updateInventoryUserData(uid, newInventory);
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
          onClick={onClickBuyItem}
        >
          <Span fontSize={'14px'} color={'white'} className={styles.buyText} >Купить</Span>
          <Span fontSize={'14px'} color={'white'} className={styles.priceText} >{price}</Span>
          <Money />
        </Button>
      </Span>
    </div>
  );
};

type TypeSidebar = 'all' | 'weapon' | 'cases' | 'graffiti' | 'sticker' | 'another';