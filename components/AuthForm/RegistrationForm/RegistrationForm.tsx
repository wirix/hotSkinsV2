import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';
import { registerWithEmailAndPassword } from '../../../firebase';
import styles from './RegistrationForm.module.css';
import { IRegistrationForm } from './RegistrationForm.interface';
import { RegistrationFormProps } from './RegistrationForm.props';

export const RegistrationForm = ({ setIsSuccess }: RegistrationFormProps): JSX.Element => {
  const { register, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IRegistrationForm>();

  // const SignupSchema = Yup.object().shape({
  //   email: Yup.string().email(`Неверно указан email`).required('Поле обязательно!'),
  //   password: Yup.string().required('Поле обязательно!').min(8, 'Минимум 8 символов'),
  //   name: Yup.string().required('Поле обязательно!').min(5, 'Минимум 5 символов').max(15, 'Максимум 15 символов')
  // });

  const onSubmit = async (formData: IRegistrationForm) => {
    try {
      registerWithEmailAndPassword(formData.username, formData.email, formData.password);
      setIsSuccess(true);
      reset();
    } catch (e) {
      if (e instanceof Error) {
        console.log('Error', e.message);
      }
      setIsSuccess(false);
    }
  };

  return (
    <form className={styles.formInner} onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('username', { required: { value: true, message: 'Заполните имя' } })}
        placeholder='Имя'
        appearance='black'
      />
      <Input
        {...register('email', { required: { value: true, message: 'Заполните почту' } })}
        placeholder='Почта'
        appearance='black'
      />
      <Input
        {...register('password', { required: { value: true, message: 'Заполните пароль' } })}
        placeholder='Пароль'
        appearance='black'
      />
      <span>
        <Button className={styles.submitButton} appearance='green' onClick={() => clearErrors()}>Отправить</Button>
      </span>
    </form>
  );
};
