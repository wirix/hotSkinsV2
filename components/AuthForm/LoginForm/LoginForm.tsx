import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';
import { funSignInWithEmailAndPassword, typeErrorLogin } from '../../../firebase/manager';
import styles from './LoginForm.module.css';
import { ILoginForm } from './LoginForm.interface';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { EnumHeadText, NotificationContext } from '../../../context/notification.context';
import { LoginSchema } from '../validation';

export const LoginForm = (): JSX.Element => {
  const router = useRouter();
  const { setNotificationParams } = useContext(NotificationContext);

  const { register, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<ILoginForm>({
    resolver: yupResolver(LoginSchema)
  });

  const onSubmit = async (formData: ILoginForm) => {
    if (!setNotificationParams) {
      return;
    }

    const res: typeErrorLogin = await funSignInWithEmailAndPassword(formData.email, formData.password);
    if (!res) {
      router.push('/');
      setNotificationParams({ typeMessage: 'success', text: 'Успешный вход', headText: EnumHeadText.SUCCESS });
    } else {
      const typeMessage = 'error';
      const headText = EnumHeadText.ERROR;
      switch (res) {
        case 'auth/wrong-password':
          setNotificationParams({ typeMessage, headText, text: 'Неверный пароль' });
          break;
        case 'auth/user-not-found':
          setNotificationParams({ typeMessage, headText, text: 'такого пользователя нет' });
          break;
        default:
          setNotificationParams({ typeMessage, headText, text: 'неизвестная ошибка' });
          break;
      }
    }
    reset();
  };

  return (
    <form className={styles.formInner} onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('email', { required: { value: true, message: 'Заполните почту' } })}
        placeholder='Почта'
        appearance='black'
        className={styles.input}
        error={errors.email}
      />
      <Input
        {...register('password', { required: { value: true, message: 'Заполните пароль' } })}
        placeholder='Пароль'
        appearance='black'
        className={cn(styles.lastinput, {
          [styles.inputError]: errors.password
        })}
        error={errors.password}
      />
      <span>
        <Button className={styles.submitButton} appearance='green' onClick={() => clearErrors()}>Отправить</Button>
      </span>
    </form>
  );
};
