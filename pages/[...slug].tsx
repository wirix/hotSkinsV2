import React, { useEffect } from 'react';
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
import { getUserData } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const SlugType = ({ shopData, pageType }: ShopProps): JSX.Element => {
  const { user, loading, error } = GetAuth();
  const isAuth = useSelector((state: RootState) => state.account.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserData(dispatch);
  }, []);

  if (loading || !isAuth) {
    return <>загрузка</>;
  }

  if (error && error instanceof Error) {
    return <div>ошибка {error.message}</div>;
  }

  if (user) {
    if (pageType) {
      switch (pageType) {
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

  if (!params.slug) {
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
      pageType: params.slug[0],
      shopData: shopData[0]
    }
  };
};

// типизация не работает
type pageType = 'cases' | 'inventory' | 'profile' | 'shop' | string;

interface ShopProps extends Record<string, unknown> {
  pageType: pageType;
  shopData: shopData;
}