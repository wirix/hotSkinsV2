import React, { useContext, useLayoutEffect, useRef } from 'react';
import { useActionCreators, useAppDispatch, useStateSelector } from '../../redux/store';
import Error404 from '../../pages/404';
import { Button, CarouselCase, Loader, SkinCard, Span } from '../../components';
import { fetchCaseInfo } from '../../redux/slices/caseSlice';
import { CaseComponentProps } from './CaseComponent.props';
import Money from './money.svg';
import styles from './CaseComponent.module.css';
import { carouselActions } from '../../redux/slices/carouselSlice';
import { updateBalanceUserData, updateInventoryUserData } from '../../firebase/manager';
import { Typecolor, csgoItem } from '../../interfaces/items.interface';
import { createNewItemForInventory, generateFakeItemsForCarousel } from './case.opening';
import { EnumHeadText, NotificationContext } from '../../context/notification.context';
import { setFirstUpperLetter } from '../../helpers/helpers';

export const CaseComponent = ({ idCase }: CaseComponentProps): JSX.Element | null => {
  const dispatch = useAppDispatch();
  const carouselAction = useActionCreators(carouselActions);
  const { status, caseInfo } = useStateSelector(state => state.case);
  const { isOpening, carouselParams } = useStateSelector(state => state.carousel);
  const { balance, isAuth, uid } = useStateSelector(state => state.account);
  const inventory = useStateSelector(state => state.inventory.inventory);
  const { setNotificationParams } = useContext(NotificationContext);

  const dropItem = useRef<csgoItem | null>(null);
  
  useLayoutEffect(() => {
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
    dropItem.current = createNewItemForInventory(caseInfo);
    carouselAction.setIsOpening('opening');
    updateInventoryUserData(uid, [...inventory, dropItem.current]);
    updateBalanceUserData(uid, balance - caseInfo.price);
  };

  const onSellCurrentItemClick = () => {
    if (!dropItem.current) {
      return;
    }
    const skinKey = dropItem.current.skinKey;
    updateBalanceUserData(uid, balance + dropItem.current.price);
    updateInventoryUserData(uid, inventory.filter(i => i.skinKey !== skinKey));
    carouselAction.setIsOpening('notOpened');
    dropItem.current = null;
  };

  const leaveNewItem = () => {
    if (!dropItem.current) {
      return;
    }
    carouselAction.setIsOpening('notOpened');
    setNotificationParams && setNotificationParams({
      typeMessage: 'success',
      text: `Приобретён предмет: ${dropItem.current.title} ${dropItem.current.property !== undefined ? `(${setFirstUpperLetter(dropItem.current.property)})` : ''}`,
      headText: EnumHeadText.SUCCESS
    });
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
          {dropItem.current.title}
          {dropItem.current.property && ` (${dropItem.current.property})`}
          <Span fontSize='16px' color={'red'}>{dropItem.current.statTrak && ' ★ StatTrak'}</Span>
        </div>
        <div>
          <img height={124} src={dropItem.current.urlImg} alt="" />
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
            onClick={() => onSellCurrentItemClick()}
          >Продать за {dropItem.current.price} <Money /></Button>
          <Button
            appearance='darkBlue'
            onClick={leaveNewItem}
          >Оставить в инвентаре</Button>
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
    const imagesCarousel = generateFakeItemsForCarousel(caseInfo, carouselParams.idxPasteNewItem + 4);
    imagesCarousel[carouselParams.idxPasteNewItem] = { urlImg: dropItem.current.urlImg, color: dropItem.current.color };
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
      <div className={styles.skinList}>
        {caseInfo.skins.map(s => (
          <div key={s.skinId} className={styles.skin}>
            <SkinCard
              color={s.color}
              urlImg={s.skinItems[0].image}
              borderRadius={'10px'}
            />
            <span className={styles.info}>
              <span className={styles.type}>{s.type}</span> |
              <span className={styles.skinTitle}> {s.skinTitle}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export interface IImagesCarousel {
  urlImg: string;
  color: Typecolor;
}