import React, { FC } from 'react';
import styles from './Layout.module.css';
import { LayoutProps } from './Layout.props';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Sidebar from './Sidebar/Sidebar';

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className={styles.layoutWrapper}>
      <div className={styles.layout}>
        <Header className={styles.header} />
        <Sidebar className={styles.sidebar} />
        <main className={styles.main} >{children}</main>
        <Footer className={styles.footer} />
      </div>
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown>>(Component: FC<T>) => {
  return function functionWithProps(props: T): JSX.Element {
    return <Layout>
      <Component {...props} />
    </Layout>;
  };
};