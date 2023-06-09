import React, { useEffect } from 'react';
import styles from './ShopComponent.module.css';
import { UniversalItem } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { setDataShop } from '../../redux/slices/shopSlice';
import { ShopComponentProps } from './ShopComponent.props';
import { RootState } from '../../redux/store';
import { csgoItem } from '../../interfaces/items.interface';
import { updateBalanceUserData, updateInventoryUserData } from '../../firebase';
import { flattenArrayOfObject } from '../../helpers/helpers';

export const ShopComponent = ({ shopData }: ShopComponentProps): JSX.Element => {
  const dispatch = useDispatch();
  const { currentCategory, saved, currentSorted } = useSelector((state: RootState) => state.shop);
  const balance = useSelector((state: RootState) => state.account.balance);
  const inventory = useSelector((state: RootState) => state.inventory.inventory);
  const flattenShopData = flattenArrayOfObject(shopData);

  const buyItem = (newItem: csgoItem, uid: string) => {
    let newInventory = { ...inventory };
    const { title, skinId, urlImg, price, type, color, property } = newItem;
    const timebuy = new Date().getTime();
    // определяем какой  тип товара, затем закидваем в firebase
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
    updateBalanceUserData(uid, Number((balance - price).toFixed(2)));
  };

  useEffect(() => {
    if (shopData) {
      dispatch(setDataShop(shopData));
    }
  }, [shopData]);

  return (
    <div className={styles.shop}>
      {flattenShopData
        .filter(item => currentCategory === 'all' ? true : (currentCategory === item.type))
        .filter(f => (currentSorted === 'saved' && saved) ? saved.includes(f.skinId) : (!saved && currentSorted === 'saved') ? false : true)
        .map((g, i) => (
          <UniversalItem
            key={i}
            buyItem={buyItem}
            stared={saved ? saved.some(s => s === g.skinId) : false}
            saved={saved}
            inventory={inventory}
            {...g}
          />
        ))}
    </div>
  );
};