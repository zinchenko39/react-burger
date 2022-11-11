import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { ILocation } from '../../interfaces/ILocations';

import { AppHeader, ProtectedRoute, Main, Modal } from '..';
import {
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
  Error404,
  Profile,
  IngredientCard,
  Feed,
} from '../../pages';
import { getItems } from '../../services/actions/thunks/get-ingredients';
import { getUserData } from '../../services/actions/thunks/get-user';

function App() {
  const location = useLocation<ILocation>();
  const history = useHistory<any>();
  const dispatch = useDispatch<any>();

  let background: any = location.state && location.state.background;

  const closeModal = () => {
    history.goBack();
    background = null;
  };

  useEffect(() => {
    dispatch(getItems());
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route exact path="/reset-password">
          <ResetPassword />
        </Route>
        <ProtectedRoute exact path="/profile">
          <Profile />
        </ProtectedRoute>
        <Route exact path="/ingredients/:id">
          <IngredientCard />
        </Route>
        <Route exact path="/feed">
          <Feed />
        </Route>
        <Route>
          <Error404 />
        </Route>
      </Switch>
      {background && (
        <Route exact path="/ingredients/:id">
          <Modal close={closeModal}>
            <IngredientCard background />
          </Modal>
        </Route>
      )}
    </>
  );
}

export default App;
