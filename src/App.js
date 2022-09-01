import React from "react";

import menu from './utils/data.js';
import { AppHeader, BurgerConstructor, BurgerIngredients } from './components';


function App () {
    return (
        <>
        <AppHeader/>
            <div className='wrapper'>
                <BurgerIngredients items = {menu}/>
                <BurgerConstructor/>
            </div>
        </>
    )
}

export default App;