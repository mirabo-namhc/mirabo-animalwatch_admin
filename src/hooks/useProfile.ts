import { getAuth } from '~utils/auth';

export default function useProfile() {
  const isLoggedIn = getAuth();

  return { isLoggedIn };
}
