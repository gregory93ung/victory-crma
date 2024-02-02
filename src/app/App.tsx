import { PrivateRoutes } from '@/app/private/PrivateRoutes';
import { PublicRoutes } from '@/app/public/PublicRoutes';
import { getLocalStorageItem, LocalStorageKeys } from '@/utils/localStorage';

import '../index.css';

export const App = () => {
  const authToken = getLocalStorageItem(LocalStorageKeys.USER);

  return authToken ? <PrivateRoutes /> : <PublicRoutes />;
};
