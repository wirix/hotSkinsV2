import React from 'react';
import { withLayout } from '../layouts/MainLayout/Layout';
import { CasesListComponent, ShopComponent, InventoryComponent } from '../page-components';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { firstLevelRoute } from '../helpers/helpers';
import { ParsedUrlQuery } from 'querystring';
import Error404 from './404';
import axios from 'axios';
import GetAuth from '../helpers/GetAuth';
import { AuthForm } from '../components';
import { shopData } from '../interfaces/items.interface';
import { INotificationContext } from '../context/notification.context';
import { auth, getUserData } from '../firebase';
import { IAccountFull } from '../interfaces/account.inteface';
import { setDataAccount } from '../redux/slices/accountSlice';
import { setDataInventory } from '../redux/slices/inventorySlice';
import { useDispatch } from 'react-redux';

const SlugType = ({ shopData, pageType }: ShopProps): JSX.Element => {
  const { user, loading, error } = GetAuth();
  const dispatch = useDispatch();

  if (loading) {
    return <>загрузка</>;
  }

  if (error && error instanceof Error) {
    return <div>ошибка {error.message}</div>;
  }

  const getUserDataFunction = async () => {
    try {
      // данные аккаунта отдельно, инвентарь отдельно
      const data = await getUserData(auth) as IAccountFull;
      const { balance, uid, username, email, password, luckyChance } = data;
      dispatch(setDataAccount({ balance, uid, username, email, password, luckyChance }));
      dispatch(setDataInventory(data.inventory));
      console.log('data', data);
    } catch (error) {
      console.log(error);
    }
  };

  getUserDataFunction();

  if (user) {
    if (pageType) {
      switch (pageType[0]) {
        case 'shop':
          return <ShopComponent shopData={shopData} />;
        case 'cases':
          return <CasesListComponent />;
        case 'inventory':
          return <InventoryComponent />;
        default:
          return <Error404 />;
      }
    } else {
      return <Error404 />;
    }
  } else {
    return <AuthForm />;
  }
};

export default withLayout<ShopProps & INotificationContext>(SlugType);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelRoute.map(f => '/' + f.route),
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<ShopProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true
    };
  }

  const firstLevelItem = firstLevelRoute.map(f => f.route === params.slug);
  if (!firstLevelItem) {
    return {
      notFound: true
    };
  }

  const { data: shopData } = await axios.get<shopData[]>(process.env.NEXT_PUBLIC_DOMAIN + 'shopItems');
  
  return {
    props: {
      pageType: params.slug,
      shopData: shopData[0]
    }
  };
};

type pageType = string | string[] | undefined;

interface ShopProps extends Record<string, unknown> {
  pageType: pageType;
  shopData: shopData;
}