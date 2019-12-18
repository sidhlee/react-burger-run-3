import React, { Component } from "react";
import styled from "styled-components";

import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

import { checkValidity } from "../../validation";

import * as actions from "../../store/actions";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";

const StyledAuth = styled.div`
  width: 90%;
  max-width: 500px;
  margin: 5em auto;
  box-sizing: border-box;
  /* center button */
  text-align: center;
`;

class Auth extends Component {
  state = {
    controls: {
      email: {
        inputType: "input",
        attr: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        inputType: "input",
        attr: {
          type: "password",
          placeholder: "Burger-Builder Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: false
  };

  componentDidMount() {
    console.log("[Auth] componentDidMount");
    const path = this.props.building ? "/checkout" : "/";
    this.props.setAuthRedirectPath(path);
  }

  handleChange = (e, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: e.target.value,
        valid: checkValidity(
          e.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  handleSubmit = e => {
    e.preventDefault();
    const email = this.state.controls.email.value;
    const password = this.state.controls.password.value;
    this.props.auth(email, password, this.state.isSignUp);
  };

  switchAuthMode = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    const controlsArray = Object.entries(
      this.state.controls
    ).map(([control, value]) => ({ name: control, ...value }));

    // map schemas into <Input>s
    const controls = controlsArray.map(
      ({ inputType, value, ...rest }) => {
        return (
          <Input
            key={rest.name}
            inputType={inputType}
            value={value}
            changed={e => this.handleChange(e, rest.name)}
            {...rest}
            shouldValidate={rest.validation}
            touched={rest.touched}
          />
        );
      }
    );

    const authForm = this.props.loading ? (
      <Spinner />
    ) : (
      <>
        {controls}
        <Button block center btnType="Success">
          Submit
        </Button>
        <Button
          block
          center
          btnType="Danger"
          clicked={this.switchAuthMode}
          // without type="button", this button will trigger submit
          // every time it is clicked.
          type="button"
        >
          {this.state.isSignUp ? "Login" : "Sign Up"}
        </Button>
      </>
    );

    const errorMessage = this.props.error ? (
      <p>{this.props.error}</p>
    ) : null;
    return (
      <StyledAuth>
        {this.props.isLoggedIn && (
          <Redirect to={this.props.authRedirectPath} />
        )}
        <form onSubmit={this.handleSubmit}>{authForm}</form>
        {errorMessage}
      </StyledAuth>
    );
  }
}

const mapStateToProps = ({
  burgerBuilder: { building },
  auth: { loading, error, token, authRedirectPath }
}) => ({
  loading,
  error,
  isLoggedIn: token !== null,
  authRedirectPath,
  building
});

const mapDispatchToProps = dispatch => ({
  auth: (email, password, isSignUp) =>
    dispatch(actions.auth(email, password, isSignUp)),
  setAuthRedirectPath: path =>
    dispatch(actions.setAuthRedirectPath(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
