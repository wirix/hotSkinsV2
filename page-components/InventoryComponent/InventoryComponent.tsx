import React from 'react';
import styles from './InventoryComponent.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { UniversalItem } from '../../components';
import { csgoItem } from '../../interfaces/items.interface';
import { updateInventoryUserData } from '../../firebase';
import { flattenArrayOfObject } from '../../helpers/helpers';

export const InventoryComponent = (): JSX.Element => {
  const inventory = useSelector((state: RootState) => state.inventory.inventory);
  const { currentCategory, saved } = useSelector((state: RootState) => state.shop);
  const flattenInventory = flattenArrayOfObject(inventory);

  const sellItem = (sellItem: csgoItem, timebuy: number, uid: string) => {
    let newInventory = { ...inventory };

    switch (sellItem.type) {
      case 'sticker':
        newInventory = {
          ...inventory,
          sticker: [...inventory.sticker.filter(s => s.timebuy !== timebuy)]
        };
        break;
      case 'weapon':
        newInventory = {
          ...inventory,
          weapon: [...inventory.weapon.filter(s => s.timebuy !== timebuy)]
        };
        break;
      case 'graffiti':
        newInventory = {
          ...inventory,
          graffiti: [...inventory.graffiti.filter(s => s.timebuy !== timebuy)]
        };
        break;
      default:
        console.error('Произошла продажа неизвестного предмета в инвентаре');
        break;
    }
    updateInventoryUserData(uid, newInventory);
  };

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