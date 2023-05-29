import React from 'react';
import styles from './InventoryComponent.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { UniversalItem } from '../../components';
import { csgoItem, shopData } from '../../interfaces/items.interface';
import { updateInventoryUserData } from '../../firebase';

export const InventoryComponent = (): JSX.Element => {
  const { inventory } = useSelector((state: RootState) => state.inventory);

  const sellItem = (inventory: shopData, newItem: csgoItem, uid: string) => {
    // продажа



    // по индексу нельзя тк если мы вдруг захотим выбрать другую сортировку, то все полетит, а свойств уникальных нет, можно добавить свойство  время покупки айтем вплоть до миллисекунд



    console.log('продажа');
    updateInventoryUserData(uid, inventory);
  };

  // ключи не уникальны
  return (
    <div className={styles.inventoryComponent}>
      {inventory.weapon.map((g, i) => (
        <UniversalItem key={i} sellItem={sellItem} {...g} />
      ))}
    </div>
  );
};