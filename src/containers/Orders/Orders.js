import React, { Component } from "react";
import styled from "styled-components";
import Order from "./Order";

import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler";

import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";

const StyledOrders = styled.div`
  margin-top: 5em;
`;

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token, this.props.userId);
  }
  render() {
    const orders = this.props.fetchingOrders ? (
      <Spinner />
    ) : (
      this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ))
    );
    return <StyledOrders>{orders}</StyledOrders>;
  }
}

const mapStateToProps = ({
  order: { fetchingOrders, orders },
  auth: { token, userId }
}) => ({
  fetchingOrders,
  orders,
  token,
  userId
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: (token, userId) =>
    dispatch(actions.fetchOrders(token, userId))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
