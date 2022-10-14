import React from 'react';
import styles from './ingridient-details.module.css';
import { useSelector } from 'react-redux';

function IngridientDetails({ item }) {
  // const activeItem = useSelector(
  //   (state) => state.currentIngredient.currentItem
  // );

  return (
    <div className={styles.ingridient_details__wrapper}>
      <div className={styles.ingridient_details_main}>
        <p className="text text_type_main-large">Детали ингридиента</p>
      </div>
      <div className={styles.ingridient_details_img}>
        <img src={item.image} alt="img" />
      </div>
      <div className={styles.ingridient_details_name}>
        <p className="text text_type_main-medium">{item.name}</p>
      </div>
      <div className={styles.ingridient_details_callories}>
        <p className="text text_type_main-default">Калории, ккал</p>
        <p className="text text_type_digits-default">{item.calories}</p>
      </div>
      <div className={styles.ingridient_details_protein}>
        <p className="text text_type_main-default">Белки, г</p>
        <p className="text text_type_digits-default">{item.proteins}</p>
      </div>
      <div className={styles.ingridient_details_fats}>
        <p className="text text_type_main-default">Жиры, г</p>
        <p className="text text_type_digits-default">{item.fat}</p>
      </div>
      <div className={styles.ingridient_details_carb}>
        <p className="text text_type_main-default">Углеводы, г</p>
        <p className="text text_type_digits-default">{item.carbohydrates}</p>
      </div>
    </div>
  );
}

export default IngridientDetails;
