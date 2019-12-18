import React from "react";
import styled from "styled-components";
import NavigationItem from "./NavigationItem";

const StyledNavigationItems = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: cneter;
  height: 100%;

  @media (min-width: 500px) {
    flex-direction: row;
  }
`;

const NavigationItems = props => (
  <StyledNavigationItems>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    {props.isLoggedIn ? (
      <>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </>
    ) : (
      <NavigationItem link="/auth">Login</NavigationItem>
    )}
  </StyledNavigationItems>
);

export default NavigationItems;
