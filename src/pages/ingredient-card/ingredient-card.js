import React from 'react'
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import IngridientDetails from '../../components/ingridient-details/ingridient-details.jsx';

function IngredientCard() {
    const {id} = useParams();
    const ingredients = useSelector((state) => state.ingredients.menu);
    const ingredient = ingredients.find(elem => elem._id === id);

    return (<div className='ingredient_wrapper'>
        {
            ingredient && <IngridientDetails item={ingredient}/>
        }
    </div>
            
    )
}

export default IngredientCard;