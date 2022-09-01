import React from "react";

import menu from '../utils/data.js';
import { AppHeader, BurgerConstructor, BurgerIngredients } from '.';


function App () {
    return (
        <>
        <AppHeader/>
            <main className='wrapper'>
                <BurgerIngredients items = {menu}/>
                <BurgerConstructor/>
            </main>
        </>
    )
}

export default App;