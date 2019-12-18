import React, { Component } from "react";
import styled from "styled-components";
import { Route, Redirect } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary";
import ContactData from "./ContactData";

import { connect } from "react-redux";

const StyledCheckout = styled.div``;

class Checkout extends Component {
  cancelCheckout = () => {
    this.props.history.goBack();
  };

  continueCheckout = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    const summary =
      !this.props.ingredients || this.props.checkoutFinished ? (
        <Redirect to="/" />
      ) : (
        <CheckoutSummary
          ingredients={this.props.ingredients}
          cancelCheckout={this.cancelCheckout}
          continueCheckout={this.continueCheckout}
        />
      );
    return (
      <StyledCheckout>
        {summary}
        <Route path={this.props.match.path + "/contact-data"}>
          <ContactData />
        </Route>
      </StyledCheckout>
    );
  }
}

const mapStateToProps = ({
  burgerBuilder: { ingredients },
  order: { checkoutFinished }
}) => ({
  ingredients,
  checkoutFinished
});

export default connect(mapStateToProps)(Checkout);
