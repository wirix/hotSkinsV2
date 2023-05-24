import Head from "next/head";
import { withLayout } from "../layouts/MainLayout/Layout";
import { CasesListComponent } from "../page-components";
import { getUserDataFunction } from '../firebase';
import GetAuth from "../helpers/GetAuth";
import { useDispatch } from "react-redux";

const Home = (): JSX.Element => {
  const { loading } = GetAuth();
  const dispatch = useDispatch();

  if (loading) {
    return <div>ждемс</div>;
  }

  getUserDataFunction(dispatch);
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