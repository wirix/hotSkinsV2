import { useLayoutEffect } from 'react';
import { withLayout } from '../layouts/MainLayout/Layout';
import { CasesListComponent, ShopComponent, InventoryComponent, CaseComponent } from '../page-components';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { firstLevelRoute } from '../helpers/helpers';
import { ParsedUrlQuery } from 'querystring';
import Error404 from './404';
import GetAuth from '../helpers/GetAuth';
import { AuthForm, Loader } from '../components';
import { INotificationContext } from '../context/notification.context';
import { getUserData } from '../firebase/manager';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../redux/store';

const SlugType = ({ pageType }: ShopProps): JSX.Element => {
  const { user, loading, error } = GetAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useLayoutEffect(() => {
    getUserData(dispatch);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error && error instanceof Error) {
    return <div>ошибка {error.message}</div>;
  }

  if (!user && pageType[0] !== 'auth') {
    router.push({
      pathname: '/auth',
      query: { name: 'registration' }
    });
    return <Loader />;
  }

  switch (pageType[0]) {
    case 'shop':
      return <ShopComponent />;
    case 'cases':
      return <CasesListComponent />;
    case 'inventory':
      return <InventoryComponent />;
    case 'case':
      return <CaseComponent idCase={+pageType[1]} />;
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
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<ShopProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params || !params.slug) {
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
    }
  };
};

interface ShopProps extends Record<string, unknown> {
  pageType: string[] | string;
}