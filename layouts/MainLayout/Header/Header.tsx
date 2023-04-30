import React, { useState } from 'react';
import styles from './Header.module.css';
import cn from 'classnames';
import { ButtonIcon, Search } from '../../../components';
import Image from 'next/image';
import logoImage from './logo.png';
import Link from 'next/link';
import { firstLevelRoute } from '../../../helpers/helpers';
import MoneyIcon from './money.svg';
import { useWindowSize } from '../../../helpers/useWindowSize';

const Header = ({ className, ...props }): JSX.Element => {
  const { width } = useWindowSize();
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <>
      {isShowMenu && <div className={styles.mobileMenu}>
        <div className={styles.mobileHeader}>
          <ButtonIcon
            icon='close'
            onClick={() => setIsShowMenu(!isShowMenu)}
          />
        </div>
        <div className={styles.mobileNav}>
          {firstLevelRoute.map(f => (
            <Link key={f.id} href={'/' + f.route}>{f.name}</Link>
          ))}
        </div>
      </div>
      }
      <header className={cn(className, styles.header)} {...props}>
        {width <= 754 && <ButtonIcon
          icon='menu'
          onClick={() => setIsShowMenu(!isShowMenu)}
        />
        }
        <Image className={styles.logo} src={logoImage} width={50} height={55} alt='' />
        <nav className={styles.nav}>
          {firstLevelRoute.map(f => (
            f.isNavLink && <Link key={f.id} href={'/' + f.route}>{f.name}</Link>
          ))}
        </nav>
        <div className={styles.search}>
          <Search
            setValue={setSearchValue}
            className={styles.input}
            value={searchValue}
            appearance='black'
            placeholder='Поиск ...'
          />
        </div>
        <div className={styles.profile}>
          <span className={styles.money}>
            <MoneyIcon />
            <span className={styles.balance}>4666565</span>
          </span>
          {width > 1180 && <span className={cn(styles.border)}></span>}
          {width >= 755 && <ButtonIcon className={styles.icon} icon='settings' />}
          <ButtonIcon className={styles.icon} icon='bell' />
          <Link href='/profile' >
            <Image className={styles.photoProfile} src={logoImage} width={50} height={55} alt='' />
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;