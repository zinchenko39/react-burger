import React, { useEffect } from "react";

import { AppHeader, BurgerConstructor, BurgerIngredients, Modal, IngridientDetails, OrderDetails} from '.';

import useModalControls from '../hooks/modal-controls.js';



function App () {
    const url = 'https://norma.nomoreparties.space/api/ingredients'
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [data, updateData] = React.useState([{}]);    
    // const modalControls = useModalControls();

    const getData = (url) => {
        setIsLoading(true)
        fetch(url)
            .then((responce) => responce.json())
            .then((res) => {
                setIsLoading(false)
                updateData(res.data)
            })
            .catch((error) => {
                setIsLoading(false)
                setIsError(true)
                console.log(`Ошибка ${error}`)
            })
    }

    useEffect(() => {
        getData(url)
    },[]);

    
    if (isLoading === false && isError === true) {
        return (
            <>
                <AppHeader/>
                <main className='wrapper'>
                    <div className="loading">Что-то пошло не так...</div>
                </main>
            </>
        )
    }

    if (isLoading === true && isError === false) {
        <main className='wrapper'>
            <div className="loading">Загружаю бургеры...</div>
        </main>
    }
    
    return (
        <>
        <AppHeader/>
        <main className='wrapper'>
            <BurgerIngredients items = {data}/>
            <BurgerConstructor items = {data}/>
            {/* <Modal isOpen={modalControls.isModalOpen} close = {modalControls.close} escClose = {modalControls.escClose}>

            </Modal> */}
        </main>
        </>
    )
}

export default App;