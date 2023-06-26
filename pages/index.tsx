import Head from "next/head";
import { withLayout } from "../layouts/MainLayout/Layout";
import { getUserData } from '../firebase/manager';
import GetAuth from "../helpers/GetAuth";
import { useEffect } from "react";
import { pushUrlAuthParams } from "../helpers/helpers";
import { useRouter } from "next/router";
import { useAppDispatch } from "../redux/store";

const Home = (): JSX.Element => {
  const { loading, user } = GetAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    getUserData(dispatch);
  }, []);

  if (loading) {
    return <div>Загрузка</div>;
  }

  if (!user) {
    pushUrlAuthParams('registration', router);
    return <div>Загрузка</div>;
  }

  return (
    <>
      <Head>
        <title>HotSkinsV2</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@200;300;400;500;700;900&display=swap" rel="stylesheet" />
      </Head>
      Добро пожаловать. Выберите категорию
    </>
  );
};

export default withLayout(Home);