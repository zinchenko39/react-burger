import { useState, useEffect } from 'react';
import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';
import { useSelector } from '../../services/hooks';

import { getUserData } from '../../services/actions/thunks/get-user';

import { ILocation } from '../../interfaces/ILocations';

export default function ProtectedRoute({
  children,
  ...rest
}: RouteProps & { children?: React.ReactNode }) {
  const location = useLocation<ILocation>();
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn);
  const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

  const init = async () => {
    await getUserData();
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }
  return (
    <Route
      {...rest}
      render={() =>
        userLoggedIn ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
}
