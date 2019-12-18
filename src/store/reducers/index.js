import { combineReducers } from "redux";
import order from "./orders";
import burgerBuilder from "./burgerBuilder";
import auth from "./auth";

export default combineReducers({
  order,
  burgerBuilder,
  auth
});
