import React, { useEffect } from 'react';
import styles from './ShopComponent.module.css';
import { UniversalItem } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { setDataShop } from '../../redux/slices/shopSlice';
import { ShopComponentProps } from './ShopComponent.props';
import { RootState } from '../../redux/store';
import { csgoItem, shopData } from '../../interfaces/items.interface';
import { updateInventoryUserData } from '../../firebase';

export const ShopComponent = ({ shopData }: ShopComponentProps): JSX.Element => {
  const dispatch = useDispatch();

  const currentCategory = useSelector((state: RootState) => state.shop.currentCategory);
  // определяем какой  тип товара, затем закидваем в firebase
  const buyItem = (inventory: shopData, newItem: csgoItem, uid: string) => {
    console.log('купля');
    let newInventory = { ...inventory };
    const { title, skinId, urlImg, price, type, color, property } = newItem;
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
      case 'weapon':
        newInventory = {
          ...inventory,
          weapon: [...inventory.weapon, { title, skinId, urlImg, price, type, color, property }],
        };
        break;
      default:
        break;
    }
    updateInventoryUserData(uid, newInventory);
  };

  useEffect(() => {
    if (shopData) {
      dispatch(setDataShop(shopData));
    }
  }, [shopData]);

  return (
    <div className={styles.shop}>
      {Object.values(shopData).flatMap(itemShop => itemShop).filter((item: csgoItem) => currentCategory === 'all' ? true : (currentCategory === item.type)).map((g, i) => <UniversalItem key={i} buyItem={buyItem} {...g} />)}
    </div>
  );
};