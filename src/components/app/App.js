import React, { useEffect } from "react";
import { BurgersContext } from '../../services/burgersContext';

import { AppHeader, BurgerConstructor, BurgerIngredients} from '..';
import { loadIngredients } from '../../utils/api.js'


function App () {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [data, updateData] = React.useState([{}]);

    useEffect(() => {
        setIsLoading(true)
        loadIngredients()
          .then((res) => {
            setIsLoading(false)
            updateData(res.data)
          })
          .catch((error) => {
                setIsError(true)
                console.log(`Ошибка ${error.statusText}`)
            })
         .finally(() => setIsLoading(false))
    },[]);
    
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
                <BurgersContext.Provider value={data}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </BurgersContext.Provider>
                </>
                : ""
            }
            </main>
        </>
    )
}

export default App;