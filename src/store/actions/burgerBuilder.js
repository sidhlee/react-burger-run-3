import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = ingredient => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredient
});

export const removeIngredient = ingredient => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredient
});

export const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients
});

export const fetchIngredientsFail = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAIL
});

export const initIngredients = () => {
  return dispatch => {
    return axios
      .get("https://burger-run-1.firebaseio.com/ingredients.json")
      .then(res => {
        console.log(res);
        dispatch(setIngredients(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchIngredientsFail(err));
      });
  };
};

export const setBuilding = bool => ({
  type: actionTypes.SET_BUILDING,
  bool
});
