import { useState, useEffect } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUserData } from '../../services/actions/get-user-actions';

import { ILocation } from '../../interfaces/ILocations';
import { IProtected } from '../../interfaces/IProtected';

export default function ProtectedRoute({ children, ...rest }: IProtected) {
  const location = useLocation() as ILocation;
  const userLoggedIn = useSelector((state: any) => state.user.userLoggedIn);
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
