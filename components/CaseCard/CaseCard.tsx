import React, { FC } from 'react';
import styles from './CaseCard.module.css';
import cn from 'classnames';
import { Span } from '../Span/Span';
import { SkinCard } from '../SkinCard/SkinCard';
import { Button } from '../Button/Button';
import { CaseCardProps } from './CaseCard.props';
import Link from 'next/link';

export const CaseCard: FC<CaseCardProps> = ({ title, urlImg, caseId, type, color, className, ...props }) => {
  return (
    <div className={styles.CaseCard}>
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
            appearance={'green'}
          >
            <Span fontSize={'14px'} color={'white'} className={styles.buyText} >Посмотреть</Span>
          </Button>
        </Link>
      </Span>
    </div>
  );
};