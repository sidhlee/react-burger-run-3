import React from "react";
import styled from "styled-components";

const StyledOrder = styled.div`
  width: 85%;
  max-width: 400px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 3px #999;
  padding: 10px;
  margin: 20px auto;
  box-sizing: border-box;
`;

const IngredientStyles = {
  textTransform: "capitalize",
  border: "1px solid #888",
  borderRadius: "8px",
  fontSize: "0.75em",
  marginRight: "5px",
  padding: "2px 5px"
};

const Order = props => {
  const ingredientsOutput = Object.entries(
    props.ingredients
  ).map(([ing, qty]) => (
    <span style={IngredientStyles} key={ing}>
      {ing}({qty})
    </span>
  ));

  return (
    <StyledOrder>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        Price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </StyledOrder>
  );
};

export default Order;
