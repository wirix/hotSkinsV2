import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';
import { registerWithEmailAndPassword, typeErrorRegistration } from '../../../firebase';
import styles from './RegistrationForm.module.css';
import { IRegistrationForm } from './RegistrationForm.interface';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { NotificationContext } from '../../../context/notification.context';

export const RegistrationForm = (): JSX.Element => {
  const router = useRouter();
  const { setTypeMessage, setText } = useContext(NotificationContext);

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email(`Неверно указан email`).required('Поле обязательно!'),
    password: Yup.string().required('Поле обязательно!').min(8, 'Минимум 8 символов'),
    username: Yup.string().required('Поле обязательно!').min(5, 'Минимум 5 символов').max(15, 'Максимум 15 символов')
  });

  const { register, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IRegistrationForm>({
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = async (formData: IRegistrationForm) => {
    if (setTypeMessage && setText) {
      const res: typeErrorRegistration = await registerWithEmailAndPassword(formData.username, formData.email, formData.password);
      if (!res) {
        router.push('/');
        setTypeMessage('success');
        setText('Вы успешно зарегистрировались');
      } else {
        setTypeMessage('error');
        switch (res) {
          case 'auth/email-already-in-use':
            setText('почта уже используется');
            break;
          case 'auth/invalid-email':
            setText('неправильная почта');
            break;
          case 'auth/weak-password':
            setText('пароль слишком слабый, добавьте как можно больше разных символов');
            break;
          case 'auth/network-request-failed':
            setText('сетевое соединение было потеряно во время регистрации. Попробуйте повторить попытку позже или проверьте свое интернет-соединение.');
            break;
          case 'auth/too-many-requests':
            setText('было слишком много неудачных попыток регистрации с вашего IP-адреса. Попробуйте повторить попытку позже');
            break;
          case 'auth/internal-error':
            setText('ошибка возникает, если произошла внутренняя ошибка Firebase. Попробуйте повторить попытку позже или свяжитесь с поддержкой Firebase, чтобы решить эту проблему.');
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
        {...register('username', { required: { value: true, message: 'Заполните имя' } })}
        placeholder='Имя'
        appearance='black'
        error={errors.username}
        className={styles.input}
      />
      <Input
        {...register('email', { required: { value: true, message: 'Заполните почту' } })}
        placeholder='Почта'
        appearance='black'
        error={errors.email}
        className={styles.input}
      />
      <Input
        {...register('password', { required: { value: true, message: 'Заполните пароль' } })}
        placeholder='Пароль'
        appearance='black'
        error={errors.password}
        className={cn(styles.lastinput, {
          [styles.inputError]: errors.password
        })}
      />
      <span>
        <Button className={styles.submitButton} appearance='green' onClick={() => clearErrors()}>Отправить</Button>
      </span>
    </form>
  );
};
