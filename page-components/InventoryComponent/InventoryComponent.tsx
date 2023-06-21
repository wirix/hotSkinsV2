import React from 'react';
import styles from './InventoryComponent.module.css';
import { useStateSelector } from '../../redux/store';
import { UniversalItem } from '../../components';
import { csgoItem } from '../../interfaces/items.interface';
import { updateBalanceUserData, updateInventoryUserData } from '../../firebase';
import { flattenArrayOfObject } from '../../helpers/helpers';

export const InventoryComponent = (): JSX.Element => {
  const inventory = useStateSelector(state => state.inventory.inventory);
  const balance = useStateSelector(state => state.account.balance);
  const { currentCategory, saved } = useStateSelector(state => state.shop);
  
  const flattenInventory = flattenArrayOfObject(inventory);

  const sellItem = (item: csgoItem, uid: string) => {
    let newInventory = { ...inventory };
    const { price, type, timebuy } = item;
    // определяем какой  тип товара, затем закидваем в firebase
    switch (type) {
      case 'graffiti':
        newInventory = {
          ...inventory,
          graffiti: [...inventory.graffiti.filter(g => g.timebuy !== timebuy)]
        };
        break;
      case 'sticker':
        newInventory = {
          ...inventory,
          sticker: [...inventory.sticker.filter(g => g.timebuy !== timebuy)],
        };
        break;
      case 'weapon':
        newInventory = {
          ...inventory,
          weapon: [...inventory.weapon.filter(g => g.timebuy !== timebuy)],
        };
        break;
      default:
        break;
    }
    updateInventoryUserData(uid, newInventory);
    updateBalanceUserData(uid, Number((balance + price).toFixed(2)));
  };

  if (flattenInventory.length === 0) {
    return <div>Пусто. Зайдите в раздел магазина</div>;
  }

  return (
    <div className={styles.inventoryComponent}>
      {flattenInventory.filter(item => currentCategory === 'all' ? true : (item && currentCategory === item.type)).map(g => g && (
        <UniversalItem
          key={g.timebuy}
          sellItem={sellItem}
          stared={saved ? saved.some(s => s === g.skinId) : false}
          saved={saved}
          inventory={inventory}
          {...g}
        />
      ))}
    </div>
  );
};