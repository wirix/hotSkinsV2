import React, { FC } from 'react';
import { CaseContentProps } from './CaseContent.props';
import styles from './CaseContent.module.css';
import cn from 'classnames';
import { CarouselCase } from '../CarouselCase/CarouselCase';
import { Button } from '../Button/Button';
import { useActionCreators, useStateSelector } from '../../redux/store';
import { carouselActions } from '../../redux/slices/carouselSlice';

export const CaseContent: FC<CaseContentProps> = ({ className, ...props }) => {
  const carouselAction = useActionCreators(carouselActions);
  const { isOpening, carouselParams } = useStateSelector(state => state.carousel);
  const { isAuth, balance } = useStateSelector(state => state.account);

  const getCurrentButton = () => {
    if (!isAuth) {
      return <Button appearance='green'>Войти</Button>;
    }
    if (isOpening === 'opening') {
      return <Button appearance='green'>Открывается...</Button>;
    }
    // цена кейса
    if (balance < 100) {
      return <Button appearance='green'>Пополнить баланс</Button>;
    }
    if (balance >= 100) {
      return <Button onClick={() => carouselAction.setIsOpening('opening')} appearance='green'>Открыть</Button>;
    }
  };

  const getCarouselCase = () => {
    return <CarouselCase carouselParams={carouselParams} isOpening={isOpening} />;
  };

  const getInfoCardCase = () => {
    return (
      <div>
        <img height={carouselParams.height + 6} src="https://cdn.csgoskins.gg/public/uih/products/aHR0cHM6Ly9zdGVhbWNvbW11bml0eS1hLmFrYW1haWhkLm5ldC9lY29ub215L2ltYWdlLy05YTgxZGxXTHdKMlVVR2NWc19uc1Z0emRPRWR0V3dLR1paTFFIVHhEWjdJNTZLVTBad3dvNE5VWDRvRkpaRUhMYlhVNUExUElZUU5xaHBPU1YtZlJQYXN3OHJzVUZKNUtCRlp2NjY4RkZZNW5hcVFJejRSN1lqaXg5YlprdktpWnJtQXp6bFR1NUFvaWJpVDhkX3gyMVd5OGhZX01XejFkb1NMTWxocE0zRktiTnMvNTEyeDM4NA--/auto/auto/85/notrim/2b7a23a0f8cc5a43177905d7d947d393.webp" alt="" />
      </div>
    );
  };

  const getInfoCardNewItem = () => {
    // временная высота может быть больше
    return <div style={{ height: carouselParams.height}}>Новый предмет</div>;
  };

  return (
    <div className={cn(styles.CaseContent, className)} {...props}>
      {isOpening === 'opening' ? getCarouselCase() :
        isOpening === 'notOpened' ? getInfoCardCase() :
          isOpening === 'opened' && getInfoCardNewItem()
      }
      <span>{getCurrentButton()}</span>
    </div>
  );
};