import React, { useState } from 'react';
import cn from 'classnames';
import { ButtonIcon, Search } from '../../../components';
import styles from './Sidebar.module.css';

const Sidebar = ({ className, ...props }): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentCategory, setCurrentCategory] = useState<string>('');

  const listCategories = ['всё', 'оружие', 'кейсы', 'граффити', 'коллекции', 'другое'];

  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <div className={styles.title}>
        <ButtonIcon
          icon='arrow'
          shape='square'
          appearance='darkBlue' />
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
        {listCategories.map(l => (
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
        <div className={styles.saved}>
          <ButtonIcon icon='star' />
          <span className={styles.savedTitle}>Сохранённые<span>(2)</span></span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;