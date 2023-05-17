import React from 'react';
import styles from './InventoryComponent.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const InventoryComponent = (): JSX.Element => {
  const { inventory } = useSelector((state: RootState) => state.inventory);
  
  return (
    <div className={styles.inventoryComponent}>
      инвентарь
    </div>
  );
};