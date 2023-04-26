import React from 'react';
import styles from './Sidebar.module.css';
import cn from 'classnames';

const Sidebar = ({ className, ...props }): JSX.Element => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      sidebar
    </div>
  );
};

export default Sidebar;