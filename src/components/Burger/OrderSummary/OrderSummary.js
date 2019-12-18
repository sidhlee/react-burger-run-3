import React from "react";
import styled from "styled-components";

import Button from "../../../components/UI/Button";

const StyledOrderSummary = styled.div`
  text-align: center;
`;

// TODO: left-align ing type, make numbers lineup vertically.
const centerUl = {
  display: "table",
  margin: "0 auto",
  transform: "translateX(-1em)"
};

const OrderSummary = props => {
  const ingredientSummary = Object.entries(props.ingredients).map(
    ([ing, qty]) => (
      <li key={ing}>
        <span style={{ textTransform: "capitalize" }}>{ing}</span>:{" "}
        {qty}
      </li>
    )
  );
  return (
    <StyledOrderSummary>
      <h3>Your Order</h3>
      <p>A tasty burger with the following ingredients:</p>
      <ul style={centerUl}>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout</p>
      <Button btnType="Danger" clicked={props.cancelOrdering}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.continueOrdering}>
        Continue
      </Button>
    </StyledOrderSummary>
  );
};

export default OrderSummary;
