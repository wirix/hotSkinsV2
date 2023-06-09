import React, { useEffect } from 'react';
import { withLayout } from '../layouts/MainLayout/Layout';
import { CasesListComponent, ShopComponent, InventoryComponent } from '../page-components';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { firstLevelRoute, pushUrlAuthParams } from '../helpers/helpers';
import { ParsedUrlQuery } from 'querystring';
import Error404 from './404';
import axios from 'axios';
import GetAuth from '../helpers/GetAuth';
import { AuthForm } from '../components';
import { shopData } from '../interfaces/items.interface';
import { INotificationContext } from '../context/notification.context';
import { getUserData } from '../firebase';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const SlugType = ({ shopData, pageType }: ShopProps): JSX.Element => {
  const { user, loading, error } = GetAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    getUserData(dispatch);
  }, []);

  if (loading) {
    return <>загрузка</>;
  }

  if (error && error instanceof Error) {
    return <div>ошибка {error.message}</div>;
  }

  if (!user && pageType !== 'auth') {
    pushUrlAuthParams('registration', router);
    return <div>Загрузка</div>;
  }

  switch (pageType) {
    case 'shop':
      return <ShopComponent shopData={shopData} />;
    case 'cases':
      return <CasesListComponent />;
    case 'inventory':
      return <InventoryComponent />;
    case 'auth':
      return <AuthForm />;
    default:
      return <Error404 />;
  }
};

export default withLayout<ShopProps & INotificationContext>(SlugType);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelRoute.map(f => '/' + f.route),
    fallback: false
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

interface ShopProps extends Record<string, unknown> {
  pageType: string;
  shopData: shopData;
}