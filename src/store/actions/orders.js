import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const checkoutEntered = () => ({
  type: actionTypes.CHECKOUT_ENTERED
});

export const orderBurgerStart = () => ({
  type: actionTypes.ORDER_BURGER_START
});
export const orderBurgerSuccess = (id, orderData) => ({
  type: actionTypes.ORDER_BURGER_SUCCESS,
  id,
  orderData
});

export const orderBurgerFail = error => ({
  type: actionTypes.ORDER_BURGER_FAIL,
  error
});

export const postOrderBurger = (orderData, token) => {
  return dispatch => {
    dispatch(orderBurgerStart());
    return axios
      .post("/orders.json?auth=" + token, orderData)
      .then(res => {
        console.log(res);
        dispatch(orderBurgerSuccess(res.data.name, orderData));
      })
      .catch(err => {
        console.log(err);
        dispatch(orderBurgerFail(err));
      });
  };
};

/* Fetch orders from the database to show them in the Orders page. */
export const fetchOrderStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrdersSucess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders
});

export const fetchOrdersFail = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error
});

const fbObjectToOrdersArray = obj => {
  return Object.entries(obj).map(([id, order]) => ({
    ...order,
    id
  }));
};

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrderStart());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    return axios
      .get(`/orders.json` + queryParams)
      .then(res => {
        const orders = fbObjectToOrdersArray(res.data);
        dispatch(fetchOrdersSucess(orders));
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchOrdersFail(err));
      });
  };
};
