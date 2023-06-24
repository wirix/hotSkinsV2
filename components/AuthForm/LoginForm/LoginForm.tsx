import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';
import { funSignInWithEmailAndPassword, typeErrorLogin } from '../../../firebase';
import styles from './LoginForm.module.css';
import { ILoginForm } from './LoginForm.interface';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { NotificationContext } from '../../../context/notification.context';

export const LoginForm = (): JSX.Element => {
  const router = useRouter();
  const { setTypeMessage, setText } = useContext(NotificationContext);

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email(`Неверно указан email`).required('Поле обязательно!'),
    password: Yup.string().required('Поле обязательно!').min(8, 'Минимум 8 символов'),
  });

  const { register, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<ILoginForm>({
    resolver: yupResolver(SignupSchema)
  });

  const onSubmit = async (formData: ILoginForm) => {
    if (setTypeMessage && setText) {
      const res: typeErrorLogin = await funSignInWithEmailAndPassword(formData.email, formData.password);
      if (!res) {
        router.push('/');
        setText('Успешный вход');
        setTypeMessage('success');
      } else {
        setTypeMessage('error');
        switch (res) {
          case 'auth/wrong-password':
            setText('почта уже используется');
            break;
          case 'auth/user-not-found':
            setText('такого пользователя нет');
            break;
          default:
            setText('неизвестная ошибка');
        }
      }
      reset();
    }
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
