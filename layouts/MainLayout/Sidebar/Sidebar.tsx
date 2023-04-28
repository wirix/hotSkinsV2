import React from 'react';
import cn from 'classnames';

const Sidebar = ({ className, ...props }): JSX.Element => {
  return (
    <div className={cn(className)} {...props}>
      sidebar
    </div>
  );
};

export default Sidebar;