import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { AppHeader, BurgerConstructor, BurgerIngredients} from '..';
import { Register, Login, ForgotPassword ,ResetPassword, Error404, Profile } from "../../pages";
import { getItems } from '../../services/actions/ingredients-actions.js';


function App () {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.ingredients.isLoading);
    const isError = useSelector(state => state.ingredients.isError);

    useEffect(() => {
        dispatch(getItems());
    },[dispatch]);
    
    return (
        <BrowserRouter>
            <AppHeader/>
             <Switch>
                <Route exact path="/">
                        <main className='wrapper'>
                        {
                            isError &&
                            <div className="loading">Что-то пошло не так...</div>
                        }
                        {
                            isLoading &&
                            <div className="loading">Загружаю бургеры...</div>
                        }
                        {
                            !isLoading && !isError ?
                            <>
                            <DndProvider backend={HTML5Backend}>
                                <BurgerIngredients />
                                <BurgerConstructor />
                            </DndProvider>
                            </>
                            : ""
                        }
                        </main>
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
                <Route exact path="/profile">
                    <Profile/>
                </Route>
                <Route >
                    <Error404/>
                </Route>
             </Switch>
        </BrowserRouter>

    )
}

export default App;