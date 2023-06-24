import React, { useContext, useEffect } from 'react';
import styles from './ShopComponent.module.css';
import { UniversalItem } from '../../components';
import { fetchShopItems } from '../../redux/slices/shopSlice';
import { useAppDispatch, useStateSelector } from '../../redux/store';
import { csgoItem } from '../../interfaces/items.interface';
import { updateBalanceUserData, updateInventoryUserData } from '../../firebase';
import { flattenArrayOfObject, setFirstUpperLetter } from '../../helpers/helpers';
import { NotificationContext } from '../../context/notification.context';

export const ShopComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchShopItems());
  }, []);

  const { setText, setHeadText, setTypeMessage } = useContext(NotificationContext);
  const { currentCategory, saved, currentSorted, shop } = useStateSelector(state => state.shop);
  const balance = useStateSelector(state => state.account.balance);
  const inventory = useStateSelector(state => state.inventory.inventory);

  console.log('render shop');

  const flattenShopData = flattenArrayOfObject(shop);

  const buyItem = (newItem: csgoItem, uid: string) => {
    if (uid && setText && setHeadText && setTypeMessage) {
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
      updateBalanceUserData(uid, Number((balance - price).toFixed(2)));
      setTypeMessage('success');
      setHeadText('Успешно');
      setText(`Приобретён предмет: ${setFirstUpperLetter(title)} ${property !== undefined ? `(${setFirstUpperLetter(property)})` : ''}`);
    } else {
      return;
    }
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