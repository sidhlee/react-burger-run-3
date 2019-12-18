import * as actionTypes from "../actions/actionTypes";
import { mergeWith, isArray } from "lodash";

const initialState = {
  orders: [],
  ordering: false,
  checkoutFinished: false,
  fetchingOrders: false
};

const checkoutEntered = (state, action) => ({
  ...state,
  checkoutFinished: false
});

const orderBurgerStart = (state, action) => ({
  ...state,
  ordering: true
});

// https://lodash.com/docs/4.17.15#mergeWith
const orderBurgerSuccess = (state, action) =>
  mergeWith(
    { ...state },
    {
      ordering: false,
      orders: [{ ...action.orderData, id: action.id }],
      checkoutFinished: true
    },
    (objValue, srcValue) =>
      isArray(objValue) ? objValue.concat(srcValue) : undefined
  );

const orderBurgerFail = (state, action) => ({
  ...state,
  ordering: false
});

const fetchOrdersStart = (state, action) => ({
  ...state,
  fetchingOrders: true
});

const fetchOrdersSuccess = (state, action) => ({
  ...state,
  orders: action.orders,
  fetchingOrders: false
});

const fetchOrdersFail = (state, action) => ({
  ...state,
  fetchingOrders: false
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHECKOUT_ENTERED:
      return checkoutEntered(state, action);
    case actionTypes.ORDER_BURGER_START:
      return orderBurgerStart(state, action);
    case actionTypes.ORDER_BURGER_SUCCESS:
      return orderBurgerSuccess(state, action);
    case actionTypes.ORDER_BURGER_FAIL:
      return orderBurgerFail(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    default:
      return state;
  }
};

export default reducer;
