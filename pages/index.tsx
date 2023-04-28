import Head from "next/head";
import { withLayout } from "../layouts/MainLayout/Layout";
import { Button } from "../components";

const Home = () => {
  return (
    <>
      <Head>
        <title>HotSkinsV2</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@200;300;400;500;700;900&display=swap" rel="stylesheet" />
      </Head>
      <div>
        <Button appearance="green" arrow="down">
          иконка
        </Button>
      </div>
    </>
  );
};

export default withLayout(Home);