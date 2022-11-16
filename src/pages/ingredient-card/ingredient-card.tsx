import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngridientDetails from '../../components/ingridient-details/ingridient-details';
import { IIngredient } from '../../interfaces/IIngredient';

function IngredientCard({ background }: any) {
  const { id } = useParams<any>();
  const ingredients = useSelector((state: any) => state.ingredients.menu);
  const ingredient = ingredients.find((elem: IIngredient) => elem._id === id);

  return (
    <div
      className={
        background ? 'ingredient_wrapper__modal' : 'ingredient_wrapper'
      }
    >
      {ingredient && <IngridientDetails item={ingredient} />}
    </div>
  );
}

export default IngredientCard;
