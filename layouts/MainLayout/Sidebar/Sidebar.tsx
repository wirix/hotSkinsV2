import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { ButtonIcon, Search } from '../../../components';
import styles from './Sidebar.module.css';
import { useRouter } from 'next/router';
import difference from 'lodash.difference';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setCurrentCategory } from '../../../redux/slices/shopSlice';
import { TypeSidebarCategoryItem, TypeSidebarTitleItem } from './Sidebar.props';
// дело в том, что сортировка по категориям не правильная ,тк используем только из shop, а если мы перейдем в инвентарь, то будем использовать то же самое состояние Sidebar, что и прежеде, можно юзать useEffect при смене url и сносить категорию, но использовать категории только из шоп, что не тоже верно, или хранить категории в каждом reducere,
// также можно в каждом состоянии хранить все возможные категории данной страницы и удаитть их от сюда, но тогда, как юзать useSelector в одном Sidebar

const Sidebar = ({ className, ...props }): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState<string>('');
  const currentCategory = useSelector((state: RootState) => state.shop.currentCategory);
  const [additionalCategory, setAdditionalCategory] = useState<string>('');

  const listCategories: ICurrentCategories[] = [
    { category: 'all', title: 'всё' },
    { category: 'weapon', title: 'оружие' },
    { category: 'cases', title: 'кейсы' },
    { category: 'graffiti', title: 'граффити' },
    { category: 'sticker', title: 'наклейки' },
    { category: 'another', title: 'другое' },
  ];

  const [currentCategories, setCurrentCategories] = useState<ICurrentCategories[]>(listCategories);
  // тперь удаляются категории не подходящие поэтому их лцшеи перекиннуть в reducer, может юзать notshow как с иконкой, если получится
  const deleteCategoriesFromShop: ICurrentCategories[] = [{ category: 'weapon', title: 'оружие' }, { category: 'another', title: 'другое' }];
  const deleteCategoriesFromCases: ICurrentCategories[] = [{ category: 'another', title: 'другое' }, { category: 'weapon', title: 'оружие' }];
  const deleteCategoriesFromInventory: ICurrentCategories[] = [];

  const additionalCategories = [
    { icon: <ButtonIcon icon='star' />, title: 'cохранённые', count: 0, notShow: ['/cases', '/inventory'] }
  ];

  const onChangeCategoryClick = ((category: TypeSidebarCategoryItem) => {
    dispatch(setCurrentCategory(category));
  });

  useEffect(() => {
    // если переходим на другой url, то убираем ненужные категории для этого url
    setCurrentCategories(difference(listCategories,
      router.asPath === '/shop' ? deleteCategoriesFromShop :
        router.asPath === '/cases' ? deleteCategoriesFromCases :
          router.asPath === '/inventory' ? deleteCategoriesFromInventory : []
    ));
    setCurrentCategory('all');
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
            key={l.category}
            className={cn(styles.category, {
              [styles.active]: l.category === currentCategory
            })}
            onClick={() => onChangeCategoryClick(l.category)}
          >{l.title}</li>
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

interface ICurrentCategories {
  category: TypeSidebarCategoryItem;
  title: TypeSidebarTitleItem;
}

export default Sidebar;