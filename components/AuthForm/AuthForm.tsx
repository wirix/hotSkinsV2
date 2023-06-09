import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LoginForm } from './LoginForm/LoginForm';
import { RegistrationForm } from './RegistrationForm/RegistrationForm';
import { Button } from '../Button/Button';
import styles from './AuthForm.module.css';
import { pushUrlAuthParams } from '../../helpers/helpers';
import { NotificationContext } from '../../context/notification.context';

export const AuthForm = (): JSX.Element => {
  const { setMessage, setType } = useContext(NotificationContext);
  const router = useRouter();
  const [typeAuth, setTypeAuth] = useState<'registration' | 'signup'>('registration');

  useEffect(() => {
    const type = router.asPath.split('=')[1];
    if (type === 'registration' || type === 'signup') {
      setTypeAuth(type);
    }

  }, [router.asPath]);

  return (
    <div className={styles.form}>
      <div className={styles.swapTab}>
        <Button
          className={typeAuth === 'registration' ? styles.active : ''}
          onClick={() => pushUrlAuthParams('registration', router)}
        >регистрация
        </Button>
        <Button
          onClick={() => pushUrlAuthParams('signup', router)}
          className={typeAuth === 'signup' ? styles.active : ''}
        >войти
        </Button>
      </div>
      {setMessage && setType && typeAuth === 'signup' && <LoginForm
        setMessage={setMessage}
        setType={setType}
      />}
      {setMessage && setType && typeAuth === 'registration' && <RegistrationForm
        setMessage={setMessage}
        setType={setType}
      />}
    </div>
  );
};
