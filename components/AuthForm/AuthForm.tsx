import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LoginForm } from './LoginForm/LoginForm';
import { RegistrationForm } from './RegistrationForm/RegistrationForm';
import { Button } from '../Button/Button';
import styles from './AuthForm.module.css';

export const AuthForm = (): JSX.Element => {
  const router = useRouter();
  const [typeAuth, setTypeAuth] = useState<'registration' | 'signup'>('registration');

  useEffect(() => {
    router.push({
      pathname: '/auth',
      query: { name: typeAuth }
    });
  }, [typeAuth, router.asPath]);

  return (
    <div className={styles.form}>
      <div className={styles.swapTab}>
        <Button
          className={typeAuth === 'registration' ? styles.active : ''}
          onClick={() => setTypeAuth('registration')}
        >регистрация
        </Button>
        <Button
          onClick={() => setTypeAuth('signup')}
          className={typeAuth === 'signup' ? styles.active : ''}
        >войти
        </Button>
      </div>
      {typeAuth === 'signup' && <LoginForm />}
      {typeAuth === 'registration' && <RegistrationForm />}
    </div>
  );
};
