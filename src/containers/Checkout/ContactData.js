import React, { Component } from "react";
import styled from "styled-components";

import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler";

import Button from "../../components/UI/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input";

import { checkValidity } from "../../validation";

import { connect } from "react-redux";

import * as actions from "../../store/actions";

const StyledContactData = styled.div`
  margin: 20px auto;
  width: 80%;
  text-align: center;
  @media (min-width: 600px) {
    width: 500px;
  }
`;

const createInputSchema = (
  inputType,
  type,
  placeholder,
  validation
) => ({
  inputType,
  attr: {
    type,
    placeholder
  },
  value: "",
  validation,
  valid: false,
  touched: false
});

class ContactData extends Component {
  state = {
    orderForm: {
      name: createInputSchema("input", "text", "Name", {
        required: true
      }),
      email: createInputSchema("input", "email", "Email", {
        required: true,
        isEmail: true
      }),
      street: createInputSchema("input", "text", "Street", {
        required: true
      }),
      zip: createInputSchema("input", "text", "Postal Code", {
        required: true,
        isNumeric: true,
        minLength: 5,
        maxLength: 5
      }),
      country: createInputSchema("input", "text", "Country", {
        required: true
      }),
      deliveryMethod: {
        inputType: "select",
        options: [
          { value: "", text: "Please Choose One" },
          { value: "fastest", text: "Fastest" },
          { value: "cheapest", text: "Cheapest" }
        ],
        validation: {},
        touched: false,
        valid: false,
        value: "fastest"
      }
    },
    isFormValid: false
  };

  postOrder = e => {
    e.preventDefault();
    // trainsform orderForm => { name: "John", email: "John@Doe.com", ... }
    const formData = Object.entries(this.state.orderForm)
      .map(([id, data]) => ({ [id]: data.value }))
      .reduce((obj, inputData) => ({ ...inputData, ...obj }), {});

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId
    };
    this.props.postOrderBurger(order, this.props.token).then(() => {
      this.props.setBuilding(false);
    });
  };

  handleChange = (e, inputElement) => {
    const inputElm = this.state.orderForm[inputElement];
    const updatedOrderForm = {
      ...this.state.orderForm,
      [inputElement]: {
        ...inputElm,
        value: e.target.value,
        touched: true
      }
    };

    const updatedInputElm = updatedOrderForm[inputElement];
    updatedInputElm.valid = checkValidity(
      updatedInputElm.value,
      updatedInputElm.validation
    );
    let isFormValid = true;
    for (let elm in updatedOrderForm) {
      isFormValid = updatedOrderForm[elm].valid && isFormValid;
    }
    this.setState({
      orderForm: updatedOrderForm,
      isFormValid
    });
  };

  render() {
    // transform orderform properties
    /* 
    { email: { 
        inputType: "input", 
        attr: {
          type: "email",
          placeholder: "Email"
        },
        value: ""
      },
      name: {
    ...    
    } 
    =>
    [
      {
        id: email, 
        inputType: "input",
        attr: {...},
        value: ""
      },
      {...}  
    ]
    */
    const formElementsArray = Object.entries(
      this.state.orderForm
    ).map(([elem, value]) => ({ id: elem, ...value }));

    // map schemas into <Input>s
    const inputs = formElementsArray.map(
      ({ inputType, value, ...rest }) => {
        return (
          <Input
            key={rest.id}
            inputType={inputType}
            value={value}
            changed={e => this.handleChange(e, rest.id)}
            {...rest}
            shouldValidate={rest.validation}
            touched={rest.touched}
          />
        );
      }
    );

    let form = this.props.ordering ? (
      <Spinner />
    ) : (
      <form onSubmit={this.postOrder}>
        {inputs}
        <Button btnType="Success" disabled={!this.state.isFormValid}>
          Order
        </Button>
      </form>
    );
    return (
      <StyledContactData>
        <h4>Enter your contact data</h4>
        {form}
      </StyledContactData>
    );
  }
}

const mapStateToProps = ({
  burgerBuilder: { ingredients, totalPrice },
  order: { ordering },
  auth: { token, userId }
}) => ({
  ingredients,
  totalPrice,
  ordering,
  token,
  userId
});

const mapDispatchToProps = dispatch => ({
  postOrderBurger: (orderData, token) =>
    dispatch(actions.postOrderBurger(orderData, token)),
  setBuilding: bool => dispatch(actions.setBuilding(bool))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
