import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';

import { AppHeader, ProtectedRoute, Main } from '..';
import { Register, Login, ForgotPassword ,ResetPassword, Error404, Profile, IngredientCard } from "../../pages";
import { getItems } from '../../services/actions/ingredients-actions.js';
import { getUserData } from "../../services/actions/get-user-actions.js";
import Modal from "../modal/modal.jsx";
// import useModalControls from '../../hooks/modal-controls';



function App () {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.modal.isOpen);
    console.log(location)

    const background = location.state && location.state.background;
    
    const closeModal = () => history.goBack();

    useEffect(() => {
        dispatch(getItems());
        dispatch(getUserData());
    },[dispatch]);
    
    return (
        <>
            <AppHeader />
            <Switch location={background || location}>
                <Route exact path="/">
                    <Main />
                </Route>
                <Route exact path="/register">
                    <Register/>
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
                <Route>
                    <Error404 />
                </Route>
            </Switch>
            {
                background &&
                <Route exact path='/ingredients/:id'>
                    <Modal isOpen={isModalOpen} close={closeModal}>
                            <IngredientCard />
                    </Modal>
                </Route>
            }
            </>
        
    )
}

export default App;