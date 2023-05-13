// пока не работает
export const handleFirebaseError = (error: string, typeAuth: 'login' | 'registration') => {
  const regex = /\(([^)]+)\)/;
  const match = regex.exec(error);
  if (match) {
    if (typeAuth === 'registration') {
      return match[1] as typeErrorRegistration;
    }
    else if (typeAuth === 'login') {
      return match[1] as typeErrorLogin;
    }
  }
  return 'unknownError';
};


export type typeErrorRegistration = 'auth/email-already-in-use' | 'auth/invalid-email' | 'auth/operation-not-allowed' | 'auth/weak-password' | 'auth/network-request-failed' | 'auth/too-many-requests' | 'auth/user-disabled' | 'auth/internal-error' | 'auth/user-not-found' | undefined | 'unknownError';

export type typeErrorLogin = 'auth/wrong-password' | 'auth/user-not-found' | undefined | 'unknownError';