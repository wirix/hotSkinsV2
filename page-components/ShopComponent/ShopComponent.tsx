import React, { useEffect } from 'react';
import styles from './ShopComponent.module.css';
import { UniversalItem, WeaponItem } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { setDataShop } from '../../redux/slices/shopSlice';
import { ShopComponentProps } from './ShopComponent.props';
import { RootState } from '../../redux/store';
import { csgoItem } from '../../interfaces/items.interface';

export const ShopComponent = ({ shopData }: ShopComponentProps): JSX.Element => {
  const dispatch = useDispatch();

  const currentCategory = useSelector((state: RootState) => state.shop.currentCategory);

  useEffect(() => {
    if (shopData) {
      dispatch(setDataShop(shopData));
    }
  }, [shopData]);

  return (
    <div className={styles.shop}>
      {Object.values(shopData).flatMap(itemShop => itemShop).filter((item: csgoItem) => currentCategory === 'all' ? true : (currentCategory === item.type)).map((g, i) => {
        // если есть float, тогда это оружие, иначе остальные айтемы
        if (g.property) {
          return <WeaponItem property={g.property} key={i} {...g} />;
        } else {
          return <UniversalItem key={i} {...g} />;
        }
      })}
    </div>
  );
};