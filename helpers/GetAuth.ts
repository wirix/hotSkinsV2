import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase';

const GetAuth = () => {
  const [user, loading, error] = useAuthState(auth);
  return { user, loading, error };
};

export default GetAuth;