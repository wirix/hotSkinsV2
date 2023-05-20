import React, { FC, useContext } from 'react';
import styles from './Layout.module.css';
import { LayoutProps } from './Layout.props';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Sidebar from './Sidebar/Sidebar';
import { INotificationContext, NotificationContext } from '../../context/notification.context';
import { NotificationContextProvider } from '../../context/notification.context';
import { Notification } from '../../components';
import { Provider } from 'react-redux';
import store from '../../redux/store';

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const { message, type } = useContext(NotificationContext);

  return (
    <div className={styles.layoutWrapper}>
      <div className={styles.layout}>
        <Header className={styles.header} />
        <Sidebar className={styles.sidebar} />
        <main className={styles.main} >{children}</main>
        <Footer className={styles.footer} />
      </div>
      {message && <Notification message={message} type={type} />}
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & INotificationContext>(Component: FC<T>) => {
  return function functionWithProps(props: T) {
    return (
      <Provider store={store}>
        <NotificationContextProvider
          message={props.message}
          // setMessage={props.setMessage}
          type={props.type}
          // setType={props.setType}
        >
          <Layout>
            <Component {...props} />
          </Layout>
        </NotificationContextProvider>
      </Provider>
    );
  };
};