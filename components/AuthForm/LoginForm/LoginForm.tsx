import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';
import { funSignInWithEmailAndPassword, typeErrorLogin } from '../../../firebase';
import styles from './LoginForm.module.css';
import { ILoginForm } from './LoginForm.interface';
import { LoginFormProps } from './LoginForm.props';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import { useRouter } from 'next/router';

export const LoginForm = ({ setType, setMessage }: LoginFormProps): JSX.Element => {
  const router = useRouter();
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email(`Неверно указан email`).required('Поле обязательно!'),
    password: Yup.string().required('Поле обязательно!').min(8, 'Минимум 8 символов'),
  });

  const { register, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<ILoginForm>({
    resolver: yupResolver(SignupSchema)
  });

  const onSubmit = async (formData: ILoginForm) => {
    const res: typeErrorLogin = await funSignInWithEmailAndPassword(formData.email, formData.password);
    // если ошибки не было => успешно
    if (!res) {
      setMessage('успешный вход');
      setType('success');
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } else {
      switch (res) {
        // обработаны не все типы
        case 'auth/wrong-password':
          setMessage('почта уже используется');
          setType('error');
          break;
        case 'auth/user-not-found':
          setMessage('такого пользователя нет');
          setType('error');
          break;
        default:
          setMessage('неизвестная ошибка');
          setType('error');
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
