import React, { useContext } from 'react';
import styles from './InventoryComponent.module.css';
import { useStateSelector } from '../../redux/store';
import { SkinItemCover } from '../../components';
import { csgoItem } from '../../interfaces/items.interface';
import { updateBalanceUserData, updateInventoryUserData } from '../../firebase/manager';
import { EnumHeadText, NotificationContext } from '../../context/notification.context';
import { setFirstUpperLetter } from '../../helpers/helpers';

export const InventoryComponent = (): JSX.Element => {
  const inventory = useStateSelector(state => state.inventory.inventory);
  const balance = useStateSelector(state => state.account.balance);
  const { currentCategory, saved } = useStateSelector(state => state.shop);
  const { setNotificationParams } = useContext(NotificationContext);

  const sellItem = (item: csgoItem, uid: string) => {
    try {
      if (!(inventory.length && setNotificationParams)) {
        return;
      }
      const { price, skinKey, title, property } = item;
      const newInventory = [...inventory.filter(i => i.skinKey !== skinKey)];
      updateInventoryUserData(uid, newInventory);
      updateBalanceUserData(uid, Number((balance + price).toFixed(2)));
      setNotificationParams({
        typeMessage: 'success',
        text: `Продан предмет: ${setFirstUpperLetter(title)} ${property !== undefined ? `(${setFirstUpperLetter(property)})` : ''}`,
        headText: EnumHeadText.SUCCESS
      });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  if (!inventory.length) {
    return <div>Пусто. Зайдите в раздел магазина</div>;
  }

  return (
    <div className={styles.inventoryComponent}>
      {inventory.filter(item => currentCategory === 'all' ? true : (item && currentCategory === item.type)).map(g => (
        <SkinItemCover
          key={g.skinKey}
          sellItem={sellItem}
          stared={saved ? saved.some(s => s === g.skinId) : false}
          saved={saved}
          {...g}
        />
      ))}
    </div>
  );
};