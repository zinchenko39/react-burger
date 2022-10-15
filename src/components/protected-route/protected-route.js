import React, {useState, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserData } from '../../services//actions/get-user-actions.js';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children, ...rest }) {
  const location = useLocation();
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn);
  const [isUserLoaded, setUserLoaded] = useState(false)
  
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
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
                )
      }
    />
  );
}
ProtectedRoute.propTypes = {
  children: PropTypes.object.isRequired,
};
