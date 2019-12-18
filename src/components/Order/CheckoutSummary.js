import React from "react";
import styled from "styled-components";

import Burger from "../Burger/Burger";
import Button from "../UI/Button";

const Wrapper = styled.div`
  text-align: center;
  width: 80%;
  margin: 5em auto 0 auto;
  @media (min-width: 600px) {
    width: 500px;
  }
`;

const BurgerWrapper = styled.div`
  width: 100%;
  margin: -30px auto 0 auto;
`;

const CheckoutSummary = props => {
  return (
    <Wrapper>
      <h1>Your tasty burger is here!</h1>
      <BurgerWrapper>
        <Burger ingredients={props.ingredients} />
      </BurgerWrapper>
      <Button
        btnType="Danger"
        clicked={props.cancelCheckout}
      >
        Cancel
      </Button>
      <Button
        btnType="Success"
        clicked={props.continueCheckout}
      >
        Continue
      </Button>
    </Wrapper>
  );
};

export default CheckoutSummary;
