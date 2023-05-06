import React from 'react';
import { withLayout } from '../layouts/MainLayout/Layout';
import { CasesListComponent, ShopComponent, InventoryComponent } from '../page-components';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { firstLevelRoute } from '../helpers/helpers';
import { ParsedUrlQuery } from 'querystring';
import Error404 from './404';

const SlugType = ({ data, pageType }: ShopProps): JSX.Element => {
  if (pageType) {
    switch (pageType[0]) {
      case 'shop':
        return <ShopComponent />;
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

  return {
    props: {
      pageType: params.slug,
      data: 1111111
    }
  };
};

type pageType = string | string[] | undefined;
type pageTypeString = 'shop' | 'cases' | 'inventory';

interface ShopProps extends Record<string, unknown> {
  pageType: pageType | pageTypeString;
  data: number;
}

export default withLayout(SlugType);