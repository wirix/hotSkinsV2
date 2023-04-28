import React, { ChangeEvent, useState } from 'react';
import cn from 'classnames';
import styles from './Search.module.css';
import SearchIcon from './search.svg';
import { SearchProps } from './Search.props';
import { Input } from '../Input/Input';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('');
  const onSearchChange = (e: string) => {
    setSearchValue(e);
  };

  return (
    <div className={cn(styles.search, className)} {...props}>
      <Input
        placeholder='Поиск...'
        className={styles.input}
        value={searchValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.currentTarget.value)}
      />
      {!searchValue ? <SearchIcon /> : <button className={styles.submit}>отпр</button>}
    </div>
  );
};