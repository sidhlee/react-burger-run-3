import React from "react";
import styled from "styled-components";
import burgerLogo from "../assets/images/burger-logo.png";

const StyledLogo = styled.div`
  background-color: white;
  padding: 5px;
  height: 100%;
  border-radius: 5px;
  box-sizing: border-box;
`;

const Logo = props => (
  <StyledLogo>
    <img
      style={{ height: "100%" }}
      src={burgerLogo}
      alt="burger logo"
    />
  </StyledLogo>
);

export default Logo;
