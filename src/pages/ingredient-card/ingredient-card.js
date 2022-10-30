import React from 'react'
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import IngridientDetails from '../../components/ingridient-details/ingridient-details';

function IngredientCard({background}) {
    const {id} = useParams();
    const ingredients = useSelector((state) => state.ingredients.menu);
    const ingredient = ingredients.find(elem => elem._id === id);
    
    return (<div className={background ? 'ingredient_wrapper__modal' : 'ingredient_wrapper'}>
        {
            ingredient && <IngridientDetails item={ingredient}/>
        }
    </div>
            
    )
}

export default IngredientCard;