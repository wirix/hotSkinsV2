import React, { useEffect } from 'react';
import styles from './ShopComponent.module.css';
import { UniversalItem, WeaponItem } from '../../components';
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
      {shopData.weapon.map((g, i) => {
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