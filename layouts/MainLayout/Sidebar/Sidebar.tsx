import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { ButtonIcon, Hr, Search } from '../../../components';
import styles from './Sidebar.module.css';
import { useRouter } from 'next/router';
import difference from 'lodash.difference';
import { useActionCreators, useStateSelector } from '../../../redux/store';
import { shopActions, sortedType } from '../../../redux/slices/shopSlice';
import { TypeSidebarCategoryItem, TypeSidebarTitleItem } from './Sidebar.props';

const Sidebar = ({ className, ...props }): JSX.Element => {
  const router = useRouter();
  const asPath = router.asPath;
  const actions = useActionCreators(shopActions);

  const [searchValue, setSearchValue] = useState<string>('');
  const { currentCategory, saved, currentSorted } = useStateSelector(state => state.shop);

  const listCategories: ICurrentCategories[] = [
    { category: 'all', title: 'всё' },
    { category: 'weapon', title: 'оружие' },
    { category: 'cases', title: 'кейсы' },
    { category: 'graffiti', title: 'граффити' },
    { category: 'sticker', title: 'наклейки' },
    { category: 'another', title: 'другое' },
  ];

  const [currentCategories, setCurrentCategories] = useState<ICurrentCategories[]>(listCategories);

  // тперь удаляются категории не подходящие поэтому их лцшеи перекиннуть в reducer, может юзать show как с иконкой, если получится
  const deleteCategoriesFromShop: ICurrentCategories[] = [{ category: 'weapon', title: 'оружие' }, { category: 'another', title: 'другое' }];
  const deleteCategoriesFromCases: ICurrentCategories[] = [{ category: 'another', title: 'другое' }, { category: 'weapon', title: 'оружие' }];

  const additionalCategories: IAdditionalCategories[] = [
    { icon: <ButtonIcon icon='star' />, title: 'cохранённые', sortedType: 'saved', count: saved ? saved.length : 0, show: ['/shop'] }
  ];

  const onSortedClick = (sorted: sortedType) => {
    actions.setCurrentSorted(sorted !== currentSorted ? sorted : 'none');
  };

  const onCategoryClick = ((category: TypeSidebarCategoryItem) => {
    actions.setCurrentCategory(category);
  });

  useEffect(() => {
    // если переходим на другой url, то убираем ненужные категории для этого url
    setCurrentCategories(difference(listCategories,
      asPath === '/shop' ? deleteCategoriesFromShop :
        asPath === '/cases' ? deleteCategoriesFromCases : []
    ));
    actions.setCurrentCategory('all');
  }, [asPath]);

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
            key={l.category}
            className={cn(styles.category, {
              [styles.active]: l.category === currentCategory
            })}
            onClick={() => onCategoryClick(l.category)}
          >{l.title}</li>
        ))}
      </ul>
      {additionalCategories.map((a, i) => a.show.every(n => n === asPath) && <Hr key={i} className={styles.hr} />)}
      <div className={styles.additional}>
        {additionalCategories.map(a => a.show.every(n => n === asPath) && <div
          key={a.title}
          className={styles.additionalItem}
        >
          {a.icon}
          <span
            onClick={() => onSortedClick(a.sortedType)}
            className={cn(styles.additionalTitle, {
              [styles.active]: currentSorted === a.sortedType
            })}>
            {a.title}
            <span>({a.count})</span>
          </span>
        </div>
        )}
      </div>
    </div>
  );
};

interface IAdditionalCategories {
  icon: JSX.Element;
  title: string;
  sortedType: sortedType;
  count: number;
  show: string[];
}

interface ICurrentCategories {
  category: TypeSidebarCategoryItem;
  title: TypeSidebarTitleItem;
}

export default Sidebar;