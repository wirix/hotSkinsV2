import { useRouter } from 'next/router';
import { AuthForm, Loader } from '../../components';
import GetAuth from '../../helpers/GetAuth';
import { FC, useEffect, useState } from 'react';

export const AuthComponent: FC = () => {
  const {user} = GetAuth();
  const router = useRouter();
  const [typeAuth, setTypeAuth] = useState<AuthType>('registration');

  const onSetTypeAuthClick = (newTypeAuth: AuthType) => {
    setTypeAuth(newTypeAuth);
  };

  useEffect(() => {
    router.push({
      pathname: '/auth',
      query: { name: typeAuth }
    });
  }, [typeAuth]);

  if (user) {
    router.push({pathname: '/'});
    return <Loader />;
  }

  return (
    <div className={''}>
      <AuthForm 
        typeAuth={typeAuth}
        setTypeAuth={onSetTypeAuthClick}
      />
    </div>
  );
};

export type AuthType = 'registration' | 'signup';