import React from 'react';
import styles from './Footer.module.css';
import cn from 'classnames';

const Footer = ({ className, ...props }): JSX.Element => {
  return (
    <footer className={cn(className, styles.footer)} {...props}>
      footer
    </footer>
  );
};

export default Footer;