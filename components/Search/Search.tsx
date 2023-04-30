import React, { ChangeEvent } from 'react';
import cn from 'classnames';
import styles from './Search.module.css';
import SearchIcon from './search.svg';
import { SearchProps } from './Search.props';
import { Input } from '../Input/Input';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

export const Search = ({ placeholder, setValue, appearance = 'transparent', value, className, ...props }: SearchProps): JSX.Element => {
  const onSearchChange = (e: string) => {
    setValue(e);
  };

  return (
    <div className={cn(styles.search, className)} {...props}>
      <Input
        appearance={appearance}
        placeholder={placeholder}
        className={styles.input}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.currentTarget.value)}
      />
      {!value ? <SearchIcon /> : <ButtonIcon icon='search' className={styles.submit} />}
    </div>
  );
};