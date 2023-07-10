import { LoginForm } from './LoginForm/LoginForm';
import { RegistrationForm } from './RegistrationForm/RegistrationForm';
import { Button } from '../Button/Button';
import styles from './AuthForm.module.css';
import { AuthFormProps } from './AuthForm.props';
import { FC } from 'react';

export const AuthForm: FC<AuthFormProps> = ({ typeAuth, setTypeAuth }) => {
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
