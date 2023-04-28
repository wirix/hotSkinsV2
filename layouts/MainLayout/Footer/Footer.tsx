import React from 'react';
import cn from 'classnames';

const Footer = ({ className, ...props }): JSX.Element => {
  return (
    <footer className={cn(className)} {...props}>
      footer
    </footer>
  );
};

export default Footer;