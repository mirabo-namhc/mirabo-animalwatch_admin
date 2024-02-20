import { getAuth } from '~utils/auth';

export default function useProfile() {
  const isLoggedIn = getAuth()?.api_token;
  const username = getAuth()?.user?.username;

  return { isLoggedIn, username };
}
