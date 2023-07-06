import React, { useEffect, useRef } from 'react';
import { useActionCreators, useAppDispatch, useStateSelector } from '../../redux/store';
import Error404 from '../../pages/404';
import { Button, CarouselCase, Loader, Span } from '../../components';
import { fetchCaseInfo } from '../../redux/slices/caseSlice';
import { CaseComponentProps } from './CaseComponent.props';
import Money from './money.svg';
import styles from './CaseComponent.module.css';
import { carouselActions } from '../../redux/slices/carouselSlice';
import { updateBalanceUserData } from '../../firebase/manager';
import { Typecolor } from '../../interfaces/items.interface';
import { createNewItemForInventory, generateFakeItemsForCarousel } from './case.opening';

export const CaseComponent = ({ idCase }: CaseComponentProps): JSX.Element | null => {
  const dispatch = useAppDispatch();
  const carouselAction = useActionCreators(carouselActions);
  const { status, caseInfo } = useStateSelector(state => state.case);
  const { isOpening, carouselParams } = useStateSelector(state => state.carousel);
  const { balance, isAuth, uid } = useStateSelector(state => state.account);
  const dropItem = useRef<ICaseItemForInventory | null>(null);

  useEffect(() => {
    dispatch(fetchCaseInfo(idCase));
  }, [idCase]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'error') {
    return <Error404 />;
  }

  if (!caseInfo) {
    return <div>Пустой кейс. Заходите позже</div>;
  }

  const onBuyCaseClick = () => {
    updateBalanceUserData(uid, balance - caseInfo.price);
    carouselAction.setIsOpening('opening');
    dropItem.current = createNewItemForInventory(caseInfo);
  };

  const onSellCurrentItemClick = () => {
    if (!dropItem.current) {
      return;
    }
    updateBalanceUserData(uid, balance + dropItem.current.price);
    carouselAction.setIsOpening('notOpened');
    dropItem.current = null;
    // sellItem(id)
  };

  const leaveNewItem = () => {
    carouselAction.setIsOpening('notOpened');
  };

  const getInfoCardCase = () => {
    return (
      <div>
        <img height={carouselParams.height} src={`${caseInfo.imageUrl}`} alt="" />
      </div>
    );
  };

  const getInfoCardNewItem = () => {
    if (!dropItem.current) {
      return;
    }
    return (
      <div className={styles.newItem}>
        <div>
          {dropItem.current.skinTitle} 
          {dropItem.current.property && ` (${dropItem.current.property})`} 
          <Span color={'red'}>{dropItem.current.StatTrak && ' ★ StatTrak'}</Span>
        </div>
        <div>
          <img height={124} src={dropItem.current.image} alt="" />
        </div>
      </div>
    );
  };

  const getCurrentButton = () => {
    if (!isAuth) {
      return <Button appearance='green'>Войти</Button>;
    }
    if (isOpening === 'opening') {
      return <Button appearance='green'>Открывается...</Button>;
    }
    if (isOpening === 'opened') {
      if (!dropItem.current) {
        return;
      }
      return (
        <div className={styles.buttons}>
          <Button
            appearance='green'
            onClick={onSellCurrentItemClick}
          >Продать за {dropItem.current.price} <Money /></Button>
          <Button 
          appearance='darkBlue'
          onClick={leaveNewItem}
          >Оставить в инвентаре(пока нет)</Button>
        </div>
      );
    }
    if (balance < caseInfo.price) {
      return <Button appearance='green'>Пополнить баланс</Button>;
    }
    if (balance >= caseInfo.price) {
      return (
        <Button
          onClick={onBuyCaseClick}
          appearance={balance < caseInfo.price ? 'darkBlue' : 'green'}
          disabled={balance < caseInfo.price}
        >
          Открыть за {caseInfo.price} <Money />
        </Button>
      );
    }
  };

  const getCarouselCase = () => {
    if (!dropItem.current) {
      return;
    }
    const imagesCarousel = generateFakeItemsForCarousel(caseInfo, 20);
    imagesCarousel[16] = { urlImg: dropItem.current.image, color: dropItem.current.color };
    return <CarouselCase imagesCarousel={imagesCarousel} carouselParams={carouselParams} isOpening={isOpening} />;
  };

  return (
    <div className={styles.CaseComponent}>
      <h4 className={styles.title}>{caseInfo.title}</h4>
      <div className={styles.content}>
        {isOpening === 'opening' ? getCarouselCase() :
          isOpening === 'notOpened' ? getInfoCardCase() :
            isOpening === 'opened' && getInfoCardNewItem()
        }
      </div>
      <span>{getCurrentButton()}</span>
    </div>
  );
};

export interface IImagesCarousel {
  urlImg: string;
  color: Typecolor;
}

export interface ICaseItemForInventory {
  color: Typecolor;
  skinId: number;
  skinTitle: string;
  type: string;
  property: string;
  StatTrak: boolean;
  price: number;
  image: string;
}