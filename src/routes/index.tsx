import { useRoutes } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import ErrorRoutes from './ErrorRoutes';
import MainRoutes from './MainRoutes';
import { useProfile } from '~/hooks';

export default function AppRoutes() {
  const { isLoggedIn } = useProfile();
  const switchRoutes = isLoggedIn ? [MainRoutes] : [AuthRoutes];
  return useRoutes([...switchRoutes, ErrorRoutes]);
}
