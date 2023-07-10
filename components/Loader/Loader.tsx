import { FC } from 'react';
import { LoaderProps } from './Loader.props';
import styles from './Loader.module.css';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image';

export const Loader: FC<LoaderProps> = ({ className, ...props }) => {
  const router = useRouter();

  return (
    <div className={cn(styles.loader, className)} {...props}>
      <Image
        width={130}
        height={130}
        src={router.basePath + '/loading.svg'}
        alt=""
      />
    </div>
  );
};