import React from 'react';
import { withLayout } from '../layouts/MainLayout/Layout';
import { CasesListComponent, ShopComponent, InventoryComponent } from '../page-components';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { firstLevelRoute } from '../helpers/helpers';
import { ParsedUrlQuery } from 'querystring';
import Error404 from './404';
import axios from 'axios';
import { IShopItem } from '../interfaces/shop.interface';
import GetAuth from '../helpers/GetAuth';
import { AuthForm } from '../components';

const SlugType = ({ data, pageType }: ShopProps): JSX.Element => {
  const { user, loading, error } = GetAuth();

  if (loading) {
    return <>загрузка</>;
  }

  if (error && error instanceof Error) {
    return <div>ошбика {error.message}</div>;
  }

  if (user) {
    if (pageType) {
      switch (pageType[0]) {
        case 'shop':
          return <ShopComponent data={data} />;
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

  const { data } = await axios.get<IShopItem[]>(process.env.NEXT_PUBLIC_DOMAIN + 'shopItems');

  return {
    props: {
      pageType: params.slug,
      data: data
    }
  };
};

type pageType = string | string[] | undefined;

interface ShopProps extends Record<string, unknown> {
  pageType: pageType;
  data: IShopItem[];
}

export default withLayout(SlugType);