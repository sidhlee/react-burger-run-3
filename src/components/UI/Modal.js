import React, { Component } from "react";
import styled from "styled-components";

import Backdrop from "./Backdrop";

const StyledModal = styled.div`
  text-align: center;
  position: fixed;
  left: 15%;
  top: 30%;
  box-sizing: border-box;
  width: 70%;
  padding: 16px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px black;
  z-index: 500;
  transition: all 0.3s ease-out;
  transform: ${props =>
    props.show ? "translateY(0)" : "translateY(-100vh)"};
  opacity: ${props => (props.show ? 1 : 0)};

  @media (min-width: 600px) {
    --width: 500px;
    width: var(--width);
    left: calc(50% - calc(var(--width) / 2));
  }
`;
class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    // Only render
    // when Modal appears or disappears
    // OR
    // when something changed from the children of this component
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  // UNSAFE_componentWillUpdate() {
  //   console.log("[Modal] componentWillUpdate");
  // }

  render() {
    return (
      <>
        <Backdrop
          show={this.props.show}
          clicked={this.props.closeModal}
        />
        <StyledModal {...this.props}>
          {this.props.children}
        </StyledModal>
      </>
    );
  }
}

export default Modal;
