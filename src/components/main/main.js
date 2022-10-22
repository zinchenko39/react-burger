import React from 'react';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerConstructor, BurgerIngredients } from '..';

function Main() {

  const isLoading = useSelector(state => state.ingredients.isLoading);
	const isError = useSelector(state => state.ingredients.isError);
  return (
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
  )
}

export default Main;