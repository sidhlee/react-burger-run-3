import * as actionTypes from "../actions/actionTypes";
import merge from "lodash/merge";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const BASE_PRICE = 3;

const initialState = {
  ingredients: null,
  totalPrice: BASE_PRICE,
  fetchIngredientsFailed: false,
  building: false
};

const addIngredient = (state, action) =>
  merge(
    { ...state },
    {
      ingredients: {
        [action.ingredient]: state.ingredients[action.ingredient] + 1
      },
      totalPrice:
        state.totalPrice + INGREDIENT_PRICES[action.ingredient],
      building: true
    }
  );

const removeIngredient = (state, action) =>
  merge(
    { ...state },
    {
      ingredients: {
        [action.ingredient]: state.ingredients[action.ingredient] - 1
      },
      totalPrice:
        state.totalPrice - INGREDIENT_PRICES[action.ingredient],
      building: true
    }
  );

// used to be inside containers/BurgerBuilder.js
// use this logic when fetching ingredient on mount(BugerBuilder)
const updateTotalPrice = ingredients => {
  const updatedPrice =
    Object.entries(ingredients)
      .map(([ing, qty]) => INGREDIENT_PRICES[ing] * qty)
      .reduce((acc, val) => acc + val) + BASE_PRICE;
  return updatedPrice;
};

const setIngredients = (state, action) => ({
  ...state,
  ingredients: {
    // re-ordering ingredients fetched from db
    salad: action.ingredients.salad,
    bacon: action.ingredients.bacon,
    cheese: action.ingredients.cheese,
    meat: action.ingredients.meat
  },
  totalPrice: updateTotalPrice(action.ingredients),
  fatchIngredientsFailed: false,
  building: false
});

const fetchIngredientFail = (state, action) =>
  merge({ ...state }, { fetchIngredientsFailed: true });

const setBuilding = (state, action) => ({
  ...state,
  building: action.bool
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAIL:
      return fetchIngredientFail(state, action);
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_BUILDING:
      return setBuilding(state, action);
    default:
      return state;
  }
};

export default reducer;
