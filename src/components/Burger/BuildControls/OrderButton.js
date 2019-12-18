import React from "react";
import styled, { keyframes } from "styled-components";

const enable = keyframes`
  0% {
    transform: scale(1);
  }

  60% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
`;

const StyledOrderButton = styled.button`
  background-color: #dad735;
  outline: none;
  cursor: pointer;
  border: 1px solid #966909;
  color: #966909;
  font-family: inherit;
  font-size: 1.2em;
  padding: 15px 30px;
  box-shadow: 2px 2px 2px #966909;

  &:hover,
  &:active {
    background-color: #a0db41;
    border: 1px solid #966909;
    color: #966909;
  }

  &:disabled {
    background-color: #c7c6c6;
    cursor: not-allowed;
    border: 1px solid #ccc;
    color: #888888;
  }

  &:not(:disabled) {
    animation: ${enable} 0.3s linear;
  }
`;

const OrderButton = props => (
  <StyledOrderButton {...props}>
    {props.children}
  </StyledOrderButton>
);

export default OrderButton;
