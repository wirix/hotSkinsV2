import React, { useContext, useEffect } from 'react';
import styles from './ShopComponent.module.css';
import { Loader, SkinItemCover } from '../../components';
import { fetchShopItems } from '../../redux/slices/shopSlice';
import { useAppDispatch, useStateSelector } from '../../redux/store';
import { csgoItem } from '../../interfaces/items.interface';
import { updateBalanceUserData, updateInventoryUserData } from '../../firebase/manager';
import { setFirstUpperLetter } from '../../helpers/helpers';
import { EnumHeadText, NotificationContext } from '../../context/notification.context';

export const ShopComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchShopItems());
  }, []);

  const { setNotificationParams } = useContext(NotificationContext);
  const { currentCategory, saved, currentSorted, shop, loading } = useStateSelector(state => state.shop);
  const balance = useStateSelector(state => state.account.balance);
  const inventory = useStateSelector(state => state.inventory.inventory);

  const buyItem = (newItem: csgoItem, uid: string) => {
    try {
      if (!(uid && newItem && setNotificationParams)) {
        return;
      }

      const { title, property, price } = newItem;
      const timebuy = new Date().getTime();
      const newInventory = [...inventory, { ...newItem, timebuy }];

      updateInventoryUserData(uid, newInventory);
      updateBalanceUserData(uid, Number((balance - price).toFixed(2)));
      setNotificationParams({
        typeMessage: 'success',
        text: `Приобретён предмет: ${setFirstUpperLetter(title)} ${property !== undefined ? `(${setFirstUpperLetter(property)})` : ''}`,
        headText: EnumHeadText.SUCCESS
      });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.shop}>
      {shop
        .filter(item => currentCategory === 'all' ? true : (currentCategory === item.type))
        .filter(item => (currentSorted === 'saved' && saved) ? saved.includes(item.skinId) : (!saved && currentSorted === 'saved') ? false : true)
        .map((g, i) => (
          <SkinItemCover
            key={i}
            buyItem={buyItem}
            stared={saved ? saved.some(s => s === g.skinId) : false}
            saved={saved}
            {...g}
          />
        ))}
    </div>
  );
};