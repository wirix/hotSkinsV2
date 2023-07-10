import React, { useState } from 'react';
import styles from './Header.module.css';
import cn from 'classnames';
import { ButtonIcon, Span } from '../../../components';
import Image from 'next/image';
import logoImage from './logo.png';
import Link from 'next/link';
import { firstLevelRoute } from '../../../helpers/helpers';
import MoneyIcon from './money.svg';
import GetAuth from '../../../helpers/GetAuth';
import { useRouter } from 'next/router';
import { logout } from '../../../firebase/manager';
import { useActionCreators, useStateSelector } from '../../../redux/store';
import { accountActions } from '../../../redux/slices/accountSlice';

const Header = ({ className, ...props }): JSX.Element => {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const { user } = GetAuth();
  const router = useRouter();
  const balance = useStateSelector(state => state.account.balance);
  const accountAction = useActionCreators(accountActions);

  const onLogoutClick = () => {
    accountAction.resetState();
    logout();
  };

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
              <Span fontWeight='700' color={'/' + f.route === router.asPath ? 'green' : 'white'} isHover>
                {f.name}
              </Span>
            </Link>
          ))}
        </div>
      </div>
      }
      <header className={cn(className, styles.header)} {...props}>
        <ButtonIcon
        className={styles.burger}
          icon='menu'
          onClick={() => setIsShowMenu(!isShowMenu)}
        />
        <Link href={'/'}>
          <Image className={styles.logo} src={logoImage} width={50} height={55} alt='' />
        </Link>
        <nav className={styles.nav}>
          {firstLevelRoute.map(f => (
            f.isNavLink && <Link key={f.id} href={'/' + f.route}>
              <Span fontWeight='700' color={'/' + f.route === router.asPath ? 'green' : 'white'} isHover>
                {f.name}
              </Span>
            </Link>
          ))}
        </nav>
        {user ?
          <div className={styles.profile}>
            <span className={styles.money}>
              <MoneyIcon />
              <span className={styles.balance}>{balance}</span>
            </span>
            <span className={cn(styles.border)}></span>
            <ButtonIcon className={styles.iconSettings} icon='settings' onClick={onLogoutClick} />
            <ButtonIcon className={styles.iconProfile} icon='bell' />
            <Link href='/profile' >
              лого
            </Link>
          </div>
          :
          <Span className={styles.registration}
            fontSize='16px' fontWeight='700' color='white' isHover>
            <Link href='/auth'>Регистрация</Link>
          </Span>
        }
      </header>
    </>
  );
};

export default Header;