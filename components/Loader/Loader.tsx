import { FC } from 'react';
import { LoaderProps } from './Loader.props';
import styles from './Loader.module.css';
import cn from 'classnames';

export const Loader: FC<LoaderProps> = ({ className, ...props }) => {
  return (
    <div className={cn(styles.loader, className)} {...props}>
      <img
        src="./loading.svg"
        alt=""
      />
    </div>
  );
};