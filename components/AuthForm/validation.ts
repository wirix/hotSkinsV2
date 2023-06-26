import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email(`Неверно указан email`).required('Поле обязательно!'),
  password: Yup.string().required('Поле обязательно!').min(8, 'Минимум 8 символов'),
});

export const RegistrationSchema = Yup.object().shape({
  email: Yup.string().email(`Неверно указан email`).required('Поле обязательно!'),
  password: Yup.string().required('Поле обязательно!').min(8, 'Минимум 8 символов'),
  username: Yup.string().required('Поле обязательно!').min(5, 'Минимум 5 символов').max(15, 'Максимум 15 символов')
});