import React, { useReducer } from 'react';
import styles from './ShopComponent.module.css';
import { ShopItem } from '../../components';
import { shopReducer } from './shop.reducer';
import { IShopItem } from '../../interfaces/shop.interface';

export const ShopComponent = ({ data }: ShopComponentProps): JSX.Element => {
  const [{ shopItems: shopItem }, dispatchShop] = useReducer(shopReducer, {
    shopItems: data
  });

  return (
    <div className={styles.shop}>
      {shopItem.map((s, i) => (
        <ShopItem key={i} stared={false} {...s} />
      ))}
    </div>
  );
};

interface ShopComponentProps {
  data: IShopItem[]
}