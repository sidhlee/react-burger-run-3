import React from "react";
import styled from "styled-components";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";

const StyledBurger = styled.div`
  width: 90%;
  margin: auto;
  margin-bottom: 10px;
  height: 250px;
  overflow: auto;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 400px) {
    width: 350px;
    height: 300px;
  }

  @media (min-width: 576px) and (min-height: 401px) {
    width: 400px;
    height: 350px;
  }

  @media (min-width: 1000px) and (min-height: 700px) {
    width: 450px;
    height: 350px;
  }
`;

/* 
{ salad: 1, bacon: 2, cheese:3, meat: 1}
=>
[
  [<BurgerIngredient key={salad0} type={salad} />],
  [
    <BurgerIngredient key={bacon0} type={bacon} />,
    <BurgerIngredient key={bacon1} type={bacon} /> 
  ],
  [
    <BurgerIngredient key={cheese0} type={cheese} />,
    <BurgerIngredient key={cheese1} type={cheese} />,
    <BurgerIngredient key={cheese2} type={cheese} />,
  ],
  [
    <BurgerIngredient key={meat0} type={meat} />,
  ]
]
*/

const flatten = nestedArray =>
  nestedArray.reduce((acc, val) => [...acc, ...val], []);

const transformIngredients = ingredients => {
  const nestedTransformedIngredients = Object.entries(
    ingredients
  ).map(([ingredient, qty]) =>
    [...Array(qty)].map((_, i) => (
      <BurgerIngredient key={ingredient + i} type={ingredient} />
    ))
  );
  // need to flatten to 1 level deep
  // in order to count the total number of ingredients
  // we'll output a message when there is 0 item.
  return flatten(nestedTransformedIngredients);
};

const burger = props => {
  let transformedIngredients = transformIngredients(props.ingredients);
  transformedIngredients.length === 0 &&
    (transformedIngredients = <p>Please add ingredients!</p>);

  return (
    <StyledBurger>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </StyledBurger>
  );
};

export default burger;
