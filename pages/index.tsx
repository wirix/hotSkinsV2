import Head from "next/head";
import { withLayout } from "../layouts/MainLayout/Layout";
import { CasesListComponent } from "../page-components";
import { auth, getUserData } from '../firebase';
import GetAuth from "../helpers/GetAuth";
import { IAccountFull } from "../interfaces/account.inteface";
import { useDispatch } from "react-redux";
import { setDataAccount } from "../redux/slices/accountSlice";
import { setDataInventory } from "../redux/slices/inventorySlice";

const Home = (): JSX.Element => {
  const { loading } = GetAuth();
  const dispatch = useDispatch();

  if (loading) {
    return <div>ждемс</div>;
  }

  const getUserDataFunction = async () => {
    try {
      // данные аккаунта отдельно, инвентарь отдельно
      const data = await getUserData(auth) as IAccountFull;
      dispatch(setDataAccount(data));
      dispatch(setDataInventory(data.inventory));
    } catch (error) {
      console.log(error);
    }
  };

  getUserDataFunction();

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