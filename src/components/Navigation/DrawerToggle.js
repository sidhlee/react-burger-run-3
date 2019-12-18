import React from "react";
import styled from "styled-components";

const StyledDrawerToggle = styled.div`
  width: 40px;
  /* if you set 100% here, top line gets bigger! */
  height: 99%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  box-sizing: border-box;
  cursor: pointer;

  @media (min-width: 500px) {
    display: none;
  }
`;

const Line = styled.div`
  width: 90%;
  height: 4px;
  background-color: white;
  border-radius: 3px;
`;
const DrawerToggle = props => (
  <StyledDrawerToggle onClick={props.clicked}>
    <Line />
    <Line />
    <Line />
  </StyledDrawerToggle>
);

export default DrawerToggle;
