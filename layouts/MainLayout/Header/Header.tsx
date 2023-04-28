import React from 'react';
import styles from './Header.module.css';
import cn from 'classnames';
import { ButtonIcon, Search } from '../../../components';
import Image from 'next/image';
import logoImage from './logo.jpg';

const Header = ({ className, ...props }): JSX.Element => {
  return (
    <header className={cn(className, styles.header)} {...props}>
      <div className={styles.logo}>
        <Image src={logoImage} width={70} height={77} alt=''/>
      </div>
      <nav className={styles.nav}>
        <ButtonIcon shape='circle' icon='bell' appearance='black' />
        <ButtonIcon shape='circle' icon='settings' appearance='black' />
        <ButtonIcon shape='circle' icon='star' appearance='black' />
        <ButtonIcon shape='circle' icon='filter' appearance='transparent' />
        <ButtonIcon shape='circle' icon='filter' appearance='darkBlue' />
      </nav>
      <div className={styles.search}>
        <Search />
      </div>
      <div className={styles.profile}>
        balance profile
      </div>
    </header>
  );
};

export default Header;