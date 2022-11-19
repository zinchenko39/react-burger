import { useEffect } from 'react';
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
  OrderPage,
} from '../../pages';
import { getItems } from '../../services/actions/thunks/get-ingredients';
import { getUserData } from '../../services/actions/thunks/get-user';
import { useDispatch } from '../../services/hooks';

function App() {
  const location = useLocation<ILocation>();
  const history = useHistory<any>();
  const dispatch = useDispatch();

  let background: any = location.state && location.state.background;

  const closeModal = () => {
    history.goBack();
    background = null;
  };

  useEffect(() => {
    dispatch(getItems());
    dispatch(getUserData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <ProtectedRoute exact path="/profile/orders">
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile/orders/:id">
          <OrderPage />
        </ProtectedRoute>
        <Route exact path="/ingredients/:id">
          <IngredientCard />
        </Route>
        <Route exact path="/feed">
          <Feed />
        </Route>
        <Route exact path="/feed/:id">
          <OrderPage />
        </Route>
        <Route>
          <Error404 />
        </Route>
      </Switch>
      {background && (
        <>
          <Route exact path="/ingredients/:id">
            <Modal close={closeModal}>
              <IngredientCard background />
            </Modal>
          </Route>
          <Route exact path="/feed/:id">
            <Modal close={closeModal}>
              <OrderPage background />
            </Modal>
          </Route>
        </>
      )}
    </>
  );
}

export default App;
