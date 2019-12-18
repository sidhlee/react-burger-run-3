import React from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
`;

const StyledInput = styled.div`
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  max-width: 500px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  font: inerit;
  font-size: 1em;
  padding: 8px 10px;
  /* remove chrome's default styling for select element */
  appearance: none;

  &:focus {
    outline: none;
    background-color: #eee;
  }

  ${props =>
    !props.valid && props.shouldValidate && props.touched
      ? css`
          &,
          &:focus {
            border: 1px solid red;
          }
        `
      : null};
`;

const Input = props => {
  const { inputType, valid, touched, ...rest } = props;
  let inputElement = null;
  switch (props.inputType) {
    case "input":
      inputElement = (
        <StyledInput
          as="input"
          onChange={props.changed}
          shouldValidate={rest.shouldValidate}
          valid={valid}
          touched={touched}
          {...rest.attr}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <StyledInput
          as="textarea"
          onChange={props.changed}
          shouldValidate={rest.shouldValidate}
          valid={valid}
          touched={touched}
          {...rest.attr}
        />
      );
      break;
    case "select":
      inputElement = (
        <StyledInput as="select" onChange={props.changed}>
          {rest.options.map(option =>
            option.value ? (
              <option key={option.text} value={option.value}>
                {option.text}
              </option>
            ) : (
              <option
                key={"placeholder" + option.text}
                value=""
                style={{ display: "none" }}
              >
                {option.text}
              </option>
            )
          )}
        </StyledInput>
      );
      break;
    default:
      inputElement = (
        <StyledInput as="input" onChange={props.changed} {...rest} />
      );
  }

  return <Wrapper>{inputElement}</Wrapper>;
};

export default Input;
