import React, { Component } from "react";
import axios from "../../axios-orders";
// import * as mock from "../../mock";

import withErrorHandler from "../../hoc/withErrorHandler";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

import { connect } from "react-redux";

import * as actions from "../../store/actions";

export class BurgerBuilder extends Component {
  state = {
    // local UI states
    ordering: false // show modal
  };
  componentDidMount() {
    this.props.initIngredients();
  }

  updatePurchasable = () => {
    const ingredients = { ...this.props.ingredients };
    const sum = Object.values(ingredients).reduce((a, v) => a + v);
    return sum > 0;
  };

  beginOrdering = () => {
    if (this.props.isLoggedIn) {
      this.setState({ ordering: true });
    } else {
      this.props.setAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  cancelOrdering = () => {
    this.setState({ ordering: false });
  };

  continueOrdering = () => {
    /* this.setState({ loading: true }); */
    this.props.checkoutEntered();
    this.props.history.push("/checkout");
  };

  render() {
    const isQtyZeroOrLess = {
      ...this.props.ingredients
    };
    for (let ing in isQtyZeroOrLess) {
      isQtyZeroOrLess[ing] = isQtyZeroOrLess[ing] <= 0;
    }
    let orderSummary = !this.props.ingredients ? (
      <Spinner />
    ) : (
      <OrderSummary
        ingredients={this.props.ingredients}
        cancelOrdering={this.cancelOrdering}
        continueOrdering={this.continueOrdering}
        totalPrice={this.props.totalPrice}
      />
    );

    let burgerAndControl = this.props.ingredients ? (
      <>
        <Burger ingredients={this.props.ingredients} />
        <BuildControls
          addIngredient={this.props.addIngredient}
          removeIngredient={this.props.removeIngredient}
          qtyZeroInfo={isQtyZeroOrLess}
          totalPrice={this.props.totalPrice}
          purchasable={this.updatePurchasable()}
          makeOrder={this.beginOrdering}
          isLoggedIn={this.props.isLoggedIn}
        />
      </>
    ) : !this.props.fetchIngredientsFailed ? (
      <Spinner />
    ) : (
      <p style={{ textAlign: "center", marginTop: "40vh" }}>
        We're sorry!
        <br />
        Ingredients can't be loaded from the server.
      </p>
    );

    return (
      <>
        <Modal
          show={this.state.ordering}
          closeModal={this.cancelOrdering}
        >
          {orderSummary}
        </Modal>
        {burgerAndControl}
      </>
    );
  }
}

//ES6 destructuring nested properties
const mapStateToProps = ({
  burgerBuilder: {
    ingredients,
    totalPrice,
    fetchIngredientsFailed,
    building
  },
  auth: { token }
}) => ({
  isLoggedIn: token !== null,
  ingredients,
  totalPrice,
  fetchIngredientsFailed,
  building
});

const mapDispatchToProps = dispatch => ({
  addIngredient: ingredient =>
    dispatch(actions.addIngredient(ingredient)),
  removeIngredient: ingredient =>
    dispatch(actions.removeIngredient(ingredient)),
  initIngredients: () => dispatch(actions.initIngredients()),
  checkoutEntered: () => dispatch(actions.checkoutEntered()),
  setAuthRedirectPath: path =>
    dispatch(actions.setAuthRedirectPath(path))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
