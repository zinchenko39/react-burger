import PropTypes from 'prop-types';

const Types = () => {

    const ingredient = {
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
    };

    const ingredientTypeShape = PropTypes.shape(ingredient);

    return {
        ingredientShapeType: ingredientTypeShape,
    };
};

export default Types();