import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LoginForm } from './LoginForm/LoginForm';
import { RegistrationForm } from './RegistrationForm/RegistrationForm';
import { Button } from '../Button/Button';
import styles from './AuthForm.module.css';
import { pushUrlAuthParams } from '../../helpers/helpers';

export const AuthForm = (): JSX.Element => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const router = useRouter();
  const [typeAuth, setTypeAuth] = useState<'registration' | 'signup' | undefined>();

  useEffect(() => {
    const type = router.asPath.split('=')[1];
    if (type === 'registration' || type === 'signup') {
      setTypeAuth(type);
    }
  }, [router.asPath]);

  if (isSuccess) {
    console.log('вход/регистр выполнен успешно');
  }

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
      {typeAuth === 'signup' && <LoginForm
        setIsSuccess={setIsSuccess}
      />}
      {typeAuth === 'registration' && <RegistrationForm
        setIsSuccess={setIsSuccess}
      />}
    </div>
  );
};
