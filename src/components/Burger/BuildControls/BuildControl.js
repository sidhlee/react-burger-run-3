import React from "react";
import styled from "styled-components";

const StyledBuildControl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
`;

const StyledButton = styled.button`
  display: block;
  font: inherit;
  padding: 5px;
  margin: 0 5px;
  width: 80px;
  border: 1px solid #aa6817;
  cursor: pointer;
  outline: none;

  background-color: ${props => {
    switch (props.text) {
      case "more":
        return "#8F5E1E";
      case "less":
        return "#DAA972";
      default:
        return "#AC9980";
    }
  }};

  &:hover,
  &:active {
    background-color: ${props => {
      switch (props.text) {
        case "more":
          return "#794012";
        case "less":
          return "rgb(223,181,134)";
        default:
          return "#AC9980";
      }
    }};
  }
  color: white;

  &:disabled {
    background-color: #ac9980;
    border: 1px solid #7e7365;
    color: white;
    cursor: default;
  }

  &:hover:disabled {
    background-color: #ac9980;
    color: #ccc;
    cursor: not-allowed;
  }
`;

const StyledLabel = styled.div`
  padding: 10px;
  font-weight: bold;
  width: 80px;
`;

const BuildControl = props => (
  <StyledBuildControl>
    <StyledLabel>{props.label}</StyledLabel>
    <StyledButton
      text="more"
      onClick={props.addThisIngredient}
    >
      More
    </StyledButton>
    <StyledButton
      text="less"
      onClick={props.removeThisIngredient}
      disabled={props.disabled}
    >
      Less
    </StyledButton>
  </StyledBuildControl>
);

export default BuildControl;
