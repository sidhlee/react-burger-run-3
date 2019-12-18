import React from "react";
import styled from "styled-components";

import Logo from "../Logo";
import NavigationItems from "./NavigationItems";
import Backdrop from "../UI/Backdrop";

const StyledSideDrawer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  max-width: 70%;
  height: 100%;
  z-index: 200;
  background-color: white;
  padding: 32px 16px;
  box-sizing: border-box;
  transition: transform 0.3s ease-out;
  transform: ${props =>
    props.sideDrawerOn ? "translateX(0)" : "translateX(-100%)"};

  @media (min-width: 500px) {
    display: none;
  }
`;

const LogoWrapper = styled.div`
  height: 11%;
  margin-bottom: 32px;
`;

const SideDrawer = props => {
  return (
    <>
      <Backdrop
        show={props.backdropOn}
        clicked={props.closeSideDrawer}
      />
      <StyledSideDrawer {...props} onClick={props.closeSideDrawer}>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <nav>
          <NavigationItems isLoggedIn={props.isLoggedIn} />
        </nav>
      </StyledSideDrawer>
    </>
  );
};

export default SideDrawer;
