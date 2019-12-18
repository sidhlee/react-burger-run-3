import React from "react";
import styled from "styled-components";

import BuildControl from "./BuildControl";
import OrderButton from "./OrderButton";

const StyledBuildControls = styled.div`
  width: 100%;
  background-color: #cf8f2e;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 1px #ccc;
  margin: auto;
  padding: 10px 0;
`;

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const BuildControls = props => {
  const mappedControls = controls.map(control => (
    <BuildControl
      key={control.label}
      label={control.label}
      addThisIngredient={() => props.addIngredient(control.type)}
      removeThisIngredient={() =>
        props.removeIngredient(control.type)
      }
      disabled={props.qtyZeroInfo[control.type]}
    />
  ));

  return (
    <StyledBuildControls>
      <p>
        Current Price: <strong>${props.totalPrice.toFixed(2)}</strong>
      </p>
      {mappedControls}
      <OrderButton
        disabled={!props.purchasable}
        onClick={props.makeOrder}
      >
        {props.isLoggedIn ? "Order Now" : "Login to Continue"}
      </OrderButton>
    </StyledBuildControls>
  );
};

export default BuildControls;
