import React from 'react'
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import IngridientDetails from '../../components/ingridient-details/ingridient-details.jsx';

function IngredientCard() {
    const {id} = useParams();
    const ingredients = useSelector((state) => state.ingredients.menu);
    console.log(ingredients)
    const ingredient = ingredients.find(elem => elem._id === id);
    console.log(ingredient)

    return (<div className='ingredient_wrapper'>
        {
            ingredient && <IngridientDetails item={ingredient}/>
        }
    </div>
            
    )
}

export default IngredientCard;