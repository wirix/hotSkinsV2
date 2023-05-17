import React, { useEffect } from 'react';
import styles from './ShopComponent.module.css';
import { ShopItem } from '../../components';
import { useDispatch } from 'react-redux';
import { setDataShop } from '../../redux/slices/shopSlice';
import { ShopComponentProps } from './ShopComponent.props';

export const ShopComponent = ({ shopData }: ShopComponentProps): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (shopData) {
      dispatch(setDataShop(shopData));
    }
  }, [shopData]);

  return (
    <div className={styles.shop}>
      {shopData.map((s, i) => (
        <ShopItem key={i} stared={false} {...s} />
      ))}
    </div>
  );
};