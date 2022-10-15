import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { AppHeader, ProtectedRoute, OrderDetails, Main } from '..';
import { Register, Login, ForgotPassword ,ResetPassword, Error404, Profile, IngredientCard } from "../../pages";
import { getItems } from '../../services/actions/ingredients-actions.js';
import { getUserData } from "../../services/actions/get-user-actions.js";
import Modal from "../modal/modal.jsx";
import useModalControls from '../../hooks/modal-controls';



function App () {
    const dispatch = useDispatch();
    const modalControls = useModalControls();

    const ingredient = useSelector(
    (state) => state.currentIngredient.currentItem
  );
  
    useEffect(() => {
        dispatch(getItems());
        dispatch(getUserData());
    },[dispatch]);
    
    return (
        <BrowserRouter>
            <AppHeader/>
             <Switch>
                <Route exact path="/">
                    <Main/>
                </Route>
                <Route exact path="/register">
                    <Register/>
                </Route>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route exact path="/forgot-password">
                    <ForgotPassword/>
                </Route>
                <Route exact path="/reset-password">
                    <ResetPassword/>
                </Route>
                <ProtectedRoute exact path="/profile">
                    <Profile/>
                </ProtectedRoute>
                <Route exact path="/ingredients/:id">
                    {
                        ingredient ?  <Main/>: <IngredientCard/>
                    }
                </Route>
                <Route >
                    <Error404/>
                </Route>
             </Switch>
             <Route exact path='/ingredients/:id' >
                {ingredient &&
                    <Modal isOpen={modalControls.isModalOpen} close={modalControls.close}>
                            <OrderDetails item={ingredient}/>
                    </Modal>
                }
            </Route>
        </BrowserRouter>
    )
}

export default App;