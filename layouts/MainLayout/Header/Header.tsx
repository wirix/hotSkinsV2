import React from 'react';
import styles from './Header.module.css';
import cn from 'classnames';

const Header = ({ className, ...props }): JSX.Element => {
  return (
    <header className={cn(className, styles.header)} {...props}>
      <div className={styles.logo}>
        logo
      </div>
      <nav className={styles.nav}>
        cases inventory
      </nav>
      <div className={styles.search}>
        search
      </div>
      <div className={styles.profile}>
        balance profile
      </div>
    </header>
  );
};

export default Header;