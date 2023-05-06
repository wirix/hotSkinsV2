import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { ButtonIcon, Search } from '../../../components';
import styles from './Sidebar.module.css';
import { useRouter } from 'next/router';
import difference from 'lodash.difference';

const Sidebar = ({ className, ...props }): JSX.Element => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentCategory, setCurrentCategory] = useState<string>('всё');
  const [additionalCategory, setAdditionalCategory] = useState<string>('');

  const listCategories = ['всё', 'оружие', 'кейсы', 'граффити', 'коллекции', 'другое'];
  const [currentCategories, setCurrentCategories] = useState<string[]>(listCategories);

  const deleteCategoriesFromShop = ['кейсы', 'другое'];
  const deleteCategoriesFromCases = ['другое', 'оружие'];
  const deleteCategoriesFromInventory = [];

  const additionalCategories = [
    { icon: <ButtonIcon icon='star' />, title: 'cохранённые', count: 0, notShow: ['/cases', '/inventory'] }
  ];

  useEffect(() => {
    // если переходим на другой url, то убираем ненужные категории для этого url
    setCurrentCategories(difference(listCategories,
      router.asPath === '/shop' ? deleteCategoriesFromShop :
        router.asPath === '/cases' ? deleteCategoriesFromCases :
          router.asPath === '/inventory' ? deleteCategoriesFromInventory : []
    ));
    setCurrentCategory('всё');
  }, [router.asPath]);

  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <div className={styles.title}>
        <div>CS:GO</div>
      </div>
      <Search
        placeholder='Поиск предмета'
        appearance='black'
        value={searchValue}
        setValue={setSearchValue}
        className={styles.input}
      />
      <ul className={styles.listCategory}>
        {currentCategories.map(l => (
          <li
            key={l}
            className={cn(styles.category, {
              [styles.active]: l === currentCategory
            })}
            onClick={() => setCurrentCategory(l)}
          >{l}</li>
        ))}
      </ul>
      <hr className={styles.hr} />
      <div className={styles.additional}>
        {additionalCategories.map(a => {
          if (a.notShow.every(n => n !== router.asPath)) {
            return (
              <div
                key={a.title}
                className={styles.additionalItem}
              >
                {a.icon}
                <span
                  onClick={() => setAdditionalCategory(prev => prev === a.title ? '' : a.title)}
                  className={cn(styles.additionalTitle, {
                    [styles.active]: additionalCategory === a.title
                  })}>
                  {a.title}
                  <span>({a.count})</span>
                </span>
              </div>
            );
        } else {
          return;
        }
        })}
      </div>
    </div>
  );
};

export default Sidebar;