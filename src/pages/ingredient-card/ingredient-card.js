import React from 'react'
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import IngridientDetails from '../../components/ingridient-details/ingridient-details.jsx';

function IngredientCard() {
    const {id} = useParams();
    const ingredients = useSelector((state) => state.ingredients.menu);
    const ingredient = ingredients.find(elem => elem._id === id);
    const isModalOpen = useSelector((state) => state.modal.isOpen);

    return (<div className={isModalOpen ? 'ingredient_wrapper__modal' : 'ingredient_wrapper'}>
        {
            ingredient && <IngridientDetails item={ingredient}/>
        }
    </div>
            
    )
}

export default IngredientCard;