import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { ADD_ITEM } from "../../services/actions/constructor-actions";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { AppHeader, BurgerConstructor, BurgerIngredients} from '..';
import { getItems } from '../../services/actions/ingredients-actions.js';


function App () {
    //D&D
    const elements = useSelector((state) => state.ingredients.menu);

    const handleDrop = (itemId) => {
        let ingredient;

        function compareIngredient () {
            elements.forEach(element => {
                if (element._id === itemId.id) {
                    ingredient = element;
                } else {
                    return
                }
            })
        }
        compareIngredient();
        
        dispatch({
            type: ADD_ITEM,
            item: ingredient,
            uniqId: Math.random(),
        })
    };

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
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor onDropHandler={handleDrop}/>
                </DndProvider>
                </>
                : ""
            }
            </main>
        </>
    )
}

export default App;