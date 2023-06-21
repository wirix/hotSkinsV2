import React, { useEffect } from 'react';
import styles from './ShopComponent.module.css';
import { UniversalItem } from '../../components';
import { fetchShopItems } from '../../redux/slices/shopSlice';
import { useAppDispatch, useStateSelector } from '../../redux/store';
import { csgoItem } from '../../interfaces/items.interface';
import { updateBalanceUserData, updateInventoryUserData } from '../../firebase';
import { flattenArrayOfObject } from '../../helpers/helpers';

export const ShopComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchShopItems());
  }, []);

  const { currentCategory, saved, currentSorted, loading, shop } = useStateSelector(state => state.shop);
  const balance = useStateSelector(state => state.account.balance);
  const inventory = useStateSelector(state => state.inventory.inventory);

  console.log('render shop');
  
  if (loading) {
    return <div>Загрузка</div>;
  }

  const flattenShopData = flattenArrayOfObject(shop);

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