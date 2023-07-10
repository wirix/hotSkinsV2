import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';
import { registerWithEmailAndPassword, typeErrorRegistration } from '../../../firebase/manager';
import styles from './RegistrationForm.module.css';
import { IRegistrationForm } from './RegistrationForm.interface';
import { yupResolver } from "@hookform/resolvers/yup";
import cn from 'classnames';
import { useRouter } from 'next/router';
import { EnumHeadText, NotificationContext } from '../../../context/notification.context';
import { RegistrationSchema } from '../validation';

export const RegistrationForm = (): JSX.Element => {
  const router = useRouter();
  const { setNotificationParams } = useContext(NotificationContext);

  const { register, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IRegistrationForm>({
    resolver: yupResolver(RegistrationSchema),
  });

  const onSubmit = async (formData: IRegistrationForm) => {
    if (!setNotificationParams) {
      return;
    }
    const res: typeErrorRegistration = await registerWithEmailAndPassword(formData.username, formData.email, formData.password);
    if (!res) {
      setNotificationParams({ typeMessage: 'success', text: 'Вы успешно зарегистрировались', headText: EnumHeadText.SUCCESS });
      router.push('/');
    } else {
      const typeMessage = 'error';
      const headText = EnumHeadText.ERROR;
      switch (res) {
        case 'auth/email-already-in-use':
          setNotificationParams({typeMessage, headText, text:'почта уже используется'});
          break;
        case 'auth/invalid-email':
          setNotificationParams({typeMessage, headText, text:'неправильная почта'});
          break;
        case 'auth/weak-password':
          setNotificationParams({typeMessage, headText, text:'пароль слишком слабый, добавьте как можно больше разных символов'});
          break;
        case 'auth/network-request-failed':
          setNotificationParams({typeMessage, headText, text:'сетевое соединение было потеряно во время регистрации. Попробуйте повторить попытку позже или проверьте свое интернет-соединение.'});
          break;
        case 'auth/too-many-requests':
          setNotificationParams({typeMessage, headText, text:'было слишком много неудачных попыток регистрации с вашего IP-адреса. Попробуйте повторить попытку позже'});
          break;
        case 'auth/internal-error':
          setNotificationParams({typeMessage, headText, text:'ошибка возникает, если произошла внутренняя ошибка Firebase. Попробуйте повторить попытку позже или свяжитесь с поддержкой Firebase, чтобы решить эту проблему.'});
          break;
        default:
          setNotificationParams({typeMessage, headText, text:'неизвестная ошибка'});
          break;
      }
    }
    reset();
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
