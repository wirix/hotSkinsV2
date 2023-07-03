import React, { FC } from 'react';
import styles from './CaseCover.module.css';
import cn from 'classnames';
import { Span } from '../Span/Span';
import Money from './money.svg';
import { SkinCard } from '../SkinCard/SkinCard';
import { Button } from '../Button/Button';
import { CaseCoverProps } from './CaseCover.props';
import { useStateSelector } from '../../redux/store';
import Link from 'next/link';

export const CaseCover: FC<CaseCoverProps> = ({ title, urlImg, caseId, price, type, color, className, ...props }) => {
  const balance = useStateSelector(state => state.account.balance);

  const isBuyItem = () => {
    return balance < price;
  };

  return (
    <div className={styles.CaseCover}>
      <div className={cn(styles.img, className)} {...props}>
        <SkinCard
          borderRadius={'10px'}
          width={180}
          className={styles.SkinCard}
          urlImg={urlImg}
          color={color}
        />
      </div>
      <Span className={styles.title} fontWeight='500' color='white'>{title}</Span>
      <Span className={styles.type} fontWeight='300'>{type}</Span>
      <Span>
        <Link href={`/case/${caseId}`}>
          <Button
            className={styles.price}
            appearance={isBuyItem() ? 'darkBlue' : 'green'}
            onClick={() => console.log('casecover')}
            disabled={isBuyItem()}
          >
            <Span fontSize={'14px'} color={'white'} className={styles.buyText} >Купить</Span>
            <Span fontSize={'14px'} color={'white'} className={styles.priceText} >{price}</Span>
            <Money />
          </Button>
        </Link>
      </Span>
    </div>
  );
};