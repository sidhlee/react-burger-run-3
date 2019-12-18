import React from "react";
import styled from "styled-components";

import NavigationItems from "./NavigationItems";
import Logo from "../Logo";
import DrawerToggle from "./DrawerToggle";

const StyledToolbar = styled.header`
  height: 56px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #703b09;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 90;
`;

const StyledNav = styled.nav`
  height: 100%;
  @media (max-width: 499px) {
    display: none;
  }
`;

const LogoWrapper = styled.div`
  height: 80%;
`;

const Toolbar = props => (
  <StyledToolbar>
    <DrawerToggle clicked={props.toggleSideDrawer} />
    <LogoWrapper>
      <Logo />
    </LogoWrapper>
    <StyledNav>
      <NavigationItems isLoggedIn={props.isLoggedIn} />
    </StyledNav>
  </StyledToolbar>
);

export default Toolbar;
