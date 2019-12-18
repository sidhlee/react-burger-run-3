import React from "react";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNavigationItem = styled.li`
  margin: 10px 0;
  box-sizing: border-box;
  display: block;
  width: 100%;

  @media (min-width: 500px) {
    margin: 0;
    display: flex;
    height: 100%;
    width: auto;
    align-items: center;
  }
`;

const activeStylesMobile = `
  color: #40A4C8;
`;

const activeStyles = `
  background-color: #8f5c2c;
  border-bottom: 4px solid #40a4c8;
  color: white;
  `;

const StyledLink = styled(NavLink)`
  color: #8f5c2c;
  text-decoration: none;
  width: 100%;
  box-sizing: border-box;
  /* need this for inline element(<a>) to have height */
  display: block;

  &:active,
  &.active {
    ${activeStylesMobile}
  }

  ${props =>
    props.active
      ? css`
          ${activeStylesMobile}
        `
      : null}

  @media (min-width: 500px) {
    color: white;
    height: 100%;
    padding: 16px 10px;
    border-bottom: 4px solid transparent;
    /* need this for inline element(<a>) to have height */

    &:active,
    &.active {
      ${activeStyles}
    }

    ${props =>
      props.active
        ? css`
            ${activeStyles}
          `
        : null}
  }
`;

const NavigationItem = props => (
  <StyledNavigationItem>
    <StyledLink
      to={props.link}
      {...props}
      exact={props.exact}
    >
      {props.children}
    </StyledLink>
  </StyledNavigationItem>
);

export default NavigationItem;
