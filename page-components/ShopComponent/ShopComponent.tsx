import React, { useEffect } from 'react';
import styles from './ShopComponent.module.css';
import { UniversalItem } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { setDataShop } from '../../redux/slices/shopSlice';
import { ShopComponentProps } from './ShopComponent.props';
import { RootState } from '../../redux/store';
import { csgoItem, shopData } from '../../interfaces/items.interface';
import { updateInventoryUserData } from '../../firebase';
import { flattenArrayOfObject } from '../../helpers/helpers';

export const ShopComponent = ({ shopData }: ShopComponentProps): JSX.Element => {
  const dispatch = useDispatch();
  const currentCategory = useSelector((state: RootState) => state.shop.currentCategory);
  const flattenShopData = flattenArrayOfObject(shopData);

  // определяем какой  тип товара, затем закидваем в firebase
  const buyItem = (inventory: shopData, newItem: csgoItem, uid: string) => {
    let newInventory = { ...inventory };
    const { title, skinId, urlImg, price, type, color, property } = newItem;
    const timebuy = new Date().getTime();
    
    switch (type) {
      case 'graffiti':
        newInventory = {
          ...inventory,
          graffiti: [...inventory.graffiti, { title, skinId, urlImg, price, type, color, timebuy }]
        };
        break;
      case 'sticker':
        newInventory = {
          ...inventory,
          sticker: [...inventory.sticker, { title, skinId, urlImg, price, type, color, timebuy }],
        };
        break;
      case 'weapon':
        newInventory = {
          ...inventory,
          weapon: [...inventory.weapon, { title, skinId, urlImg, price, type, color, property, timebuy }],
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
      {flattenShopData.filter(item => currentCategory === 'all' ? true : (currentCategory === item.type)).map((g, i) => <UniversalItem key={i} buyItem={buyItem} {...g} />)}
    </div>
  );
};