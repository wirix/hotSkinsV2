import Head from "next/head";
import { withLayout } from "../layouts/MainLayout/Layout";
import { CasesListComponent } from "../page-components";
import { getUserDataFunction } from '../firebase';
import GetAuth from "../helpers/GetAuth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Home = (): JSX.Element => {
  const { loading } = GetAuth();
  const isAuth = useSelector((state: RootState) => state.account.isAuth);
  const dispatch = useDispatch();

  getUserDataFunction(dispatch);

  if (loading || !isAuth) {
    return <div>ждемс</div>;
  }

  return (
    <>
      <Head>
        <title>HotSkinsV2</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@200;300;400;500;700;900&display=swap" rel="stylesheet" />
      </Head>
      <CasesListComponent />
    </>
  );
};

export default withLayout(Home);