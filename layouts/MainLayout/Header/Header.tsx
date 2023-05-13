import React, { useState } from 'react';
import styles from './Header.module.css';
import cn from 'classnames';
import { Button, ButtonIcon, Search, Span } from '../../../components';
import Image from 'next/image';
import logoImage from './logo.png';
import Link from 'next/link';
import { firstLevelRoute, pushUrlAuthParams } from '../../../helpers/helpers';
import MoneyIcon from './money.svg';
import { useWindowSize } from '../../../hooks/useWindowSize';
import GetAuth from '../../../helpers/GetAuth';
import { useRouter } from 'next/router';
import { logout } from '../../../firebase';

const Header = ({ className, ...props }): JSX.Element => {
  const { width } = useWindowSize();
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const { user } = GetAuth();
  const router = useRouter();

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
            <Link key={f.id} href={'/' + f.route}>
              <Span fontWeight='700' color='white' isHover>
                {f.name}
              </Span>
            </Link>
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
            f.isNavLink && <Link key={f.id} href={'/' + f.route}>
              <Span fontWeight='700' color='white' isHover>
                {f.name}
              </Span>
            </Link>
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
        {user ?
          <div className={styles.profile}>
            <span className={styles.money}>
              <MoneyIcon />
              <span className={styles.balance}>4666565</span>
            </span>
            {width > 1180 && <span className={cn(styles.border)}></span>}
            {width >= 755 && <ButtonIcon className={styles.icon} icon='settings' onClick={() => logout()} />}
            <ButtonIcon className={styles.icon} icon='bell' />
            <Link href='/profile' >
              <Image className={styles.photoProfile} src={logoImage} width={50} height={55} alt='' />
            </Link>
          </div>
          :
          <Span className={styles.registration} onClick={() => pushUrlAuthParams('registration', router)} fontSize='16px' fontWeight='700' color='white' isHover>
            Регистрация
          </Span>
        }
      </header>
    </>
  );
};

export default Header;