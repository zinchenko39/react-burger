/* eslint-disable no-useless-constructor */
import React from "react";
import '../css/burger-ingredients.css';
import BurgerCard from './BurgerCard';

// class BurgerIngredients extends React.Component {
//     render () {
//         return (
//             <section className="burger-ingredients__container">
//                 <div className="burger-ingredients__title">
//                     <h1 className="text text_type_main-medium">Соберите бургер</h1>
//                 </div>
//                 <ul className="burger-ingredients__tabs_list">
//                     <li className="burger-ingredients__tab burger-ingredients__tab_active text text_type_main-default">Булки</li>
//                     <li className="burger-ingredients__tab text text_type_main-default">Соусы</li>
//                     <li className="burger-ingredients__tab text text_type_main-default">Начинки</li>
//                 </ul>
//                 <div className="burger-ingredients__main">
//                     <h2 className="burger-ingredients__main_headline">Булки</h2>
//                     <div className="burger-ingredients__main_column-buns">
//                       <div>{BurgerCard}</div>
//                     </div>
//                 </div>
//             </section>
//         )
//     }
// }
function BurgerIngredients ({items}) {
    const buns = [];
    const main = [];
    const sauce = [];
    items.forEach(elem => {
        if (elem.type === 'bun') {
            buns.push(elem);
        } else if (elem.type === 'main') {
            main.push(elem);
        } else {
            sauce.push(elem);
        }
    });


    return (
        <>
        <section className="burger-ingredients__container">
                <div className="burger-ingredients__title">
                    <h1 className="text text_type_main-medium">Соберите бургер</h1>
                </div>
                <ul className="burger-ingredients__tabs_list">
                    <li className="burger-ingredients__tab burger-ingredients__tab_active text text_type_main-default">Булки</li>
                    <li className="burger-ingredients__tab text text_type_main-default">Соусы</li>
                    <li className="burger-ingredients__tab text text_type_main-default">Начинки</li>
                </ul>
                <div className="burger-ingredients__main">
                    <h2 className="burger-ingredients__main_headline">Булки</h2>
                    <div className="burger-ingredients__main_column-buns">
                      {
                        buns.map((obj, index) => (
                            <BurgerCard image = {obj.image} price = {obj.price} name = {obj.name} key = {`${index}_${obj.name}`}/>
                          ))
                      }
                    </div>
                </div>
            </section>
        </>
    )
}

export default BurgerIngredients;