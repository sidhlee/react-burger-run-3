import React from "react";
import styled from "styled-components";

const getColorForBtnType = props => {
  switch (props.btnType) {
    case "Success":
      return "#5C9210";
    case "Danger":
      return "#944317";
    default:
      return "white";
  }
};

const StyledButton = styled.button`
  display: ${props => (props.block ? "block" : "inline-block")};
  background-color: transparent;
  border: none;
  color: ${getColorForBtnType};
  outline: none;
  cursor: pointer;
  font: inherit;
  padding: 10px;
  margin: ${props => (props.center ? "10px auto" : "10px")};
  font-weight: bold;
  &:disabled {
    color: #bbb;
    cursor: not-allowed;
  }
`;

const Button = props => (
  <StyledButton {...props} onClick={props.clicked}>
    {props.children}
  </StyledButton>
);

export default Button;
