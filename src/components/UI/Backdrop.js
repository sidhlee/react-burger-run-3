import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledBackdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Backdrop = props =>
  props.show ? (
    <StyledBackdrop onClick={props.clicked} />
  ) : null;

export default Backdrop;

Backdrop.propTypes = {
  clicked: PropTypes.func.isRequired
};
