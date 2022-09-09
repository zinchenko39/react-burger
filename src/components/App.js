import React, { useEffect } from "react";

import { AppHeader, BurgerConstructor, BurgerIngredients} from '.';



function App () {
    const url = 'https://norma.nomoreparties.space/api/ingredients'
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [data, updateData] = React.useState([{}]);    

    const getData = (url) => {
        setIsLoading(true)
        fetch(url)
            .then((responce) => {
                if(responce.ok) {
                    return responce.json()
                }
                return Promise.reject(`Ошибка ${responce.status}`);
            })
            .then((res) => {
                setIsLoading(false)
                updateData(res.data)
            })
            .catch((error) => {
                setIsError(true)
                console.log(`Ошибка ${error}`)
            })
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        getData(url)
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
                <BurgerIngredients items = {data}/>
                <BurgerConstructor items = {data}/>
                </>
                : ""
            }
            </main>
        </>
    )
}

export default App;