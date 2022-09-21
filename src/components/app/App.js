import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { AppHeader, BurgerConstructor, BurgerIngredients} from '..';
import { getItems } from '../../services/actions/ingredients-actions.js';


function App () {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.ingredients.isLoading);
    const isError = useSelector(state => state.ingredients.isError);

    useEffect(() => {
        dispatch(getItems());
    },[dispatch]);
    
    return (
        <>
            <AppHeader/>
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
                    <BurgerIngredients />
                    <BurgerConstructor />
                </>
                : ""
            }
            </main>
        </>
    )
}

export default App;