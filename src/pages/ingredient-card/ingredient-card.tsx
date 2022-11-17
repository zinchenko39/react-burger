import { useParams } from 'react-router-dom';
import IngridientDetails from '../../components/ingridient-details/ingridient-details';
import { IIngredient } from '../../interfaces/IIngredient';
import { useSelector } from '../../services/hooks';

function IngredientCard({ background }: any) {
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector((state) => state.ingredients.menu);
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
