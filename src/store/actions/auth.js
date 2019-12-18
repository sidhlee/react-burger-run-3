import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error
});

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return { type: actionTypes.AUTH_LOGOUT };
};

export const checkAuthTimeout = seconds => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, seconds * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const payload = {
      email,
      password,
      returnSecureToken: true
    };
    const url = isSignUp
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAeCKD3lS1128Yr4OzYq4bu6G6IPH__Log"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAeCKD3lS1128Yr4OzYq4bu6G6IPH__Log";
    return axios
      .post(url, payload)
      .then(res => {
        console.log(res);
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(err => {
        // axios wraps errors differently depeding on
        // the nature of the error
        if (err.response) {
          // server response > 2xx
          console.log(err.response.data);
          dispatch(authFail(err.response.data.error.message));
        } else if (err.request) {
          // request made, no response from the server
          console.log(err.request);
        } else {
          // errored before sending req
          console.log(err.config);
        }
      });
  };
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path
});

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(
        localStorage.getItem("expirationDate")
      );
      if (expirationDate > new Date()) {
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
