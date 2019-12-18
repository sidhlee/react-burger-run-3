import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

import Logout from "./containers/Auth/Logout";

import { connect } from "react-redux";
import * as actions from "./store/actions";
import asyncComponent from "./hoc/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});
const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});
const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

class App extends Component {
  
  componentDidMount() {
    console.log("[App] componentDidMount");
    this.props.authCheckState();
  }

  render() {
    let routes = this.props.isLoggedIn ? (
      <Switch>
        <Route
          path="/"
          exact
          // only the directly rendered components receive
          // history, location and match props
          // their child components don't get those.
          component={BurgerBuilder}
        />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={asyncAuth} />x
        <Redirect to="/" exact />
      </Switch>
    ) : (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={asyncAuth} />x
        <Redirect to="/" exact />
      </Switch>
    );

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { token } }) => ({
  isLoggedIn: token !== null
});
const mapDispatchToProps = dispatch => ({
  authCheckState: () => dispatch(actions.authCheckState())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
