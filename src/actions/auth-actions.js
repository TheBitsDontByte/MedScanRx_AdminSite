import axios from "axios";
import { BASE_URL } from "../globals/index";

export const LOGIN = "login";
export const LOGOUT = "logout";
export const LOGIN_ERROR = "login_failure";
export const CLEAR_ERRORS_BEFORE_LOGIN = "clear_errors_before_login";

//Authentication & Login & Logout
export function login(loginData, navigationCallback) {
  return dispatch => {
    dispatch({
      type: CLEAR_ERRORS_BEFORE_LOGIN
    });

    axios
      .post(`${BASE_URL}/api/auth/admin/login`, loginData)
      .then(response => {
        sessionStorage.setItem("jwt", response.data.token);

        axios.defaults.headers.common["Authorization"] = `Bearer ${
          response.data.token
        }`;

        dispatch({
          type: LOGIN,
          payload: loginData.userName
        });

        if (navigationCallback) navigationCallback();
      })
      .catch(error => {
        dispatch({
          type: LOGIN_ERROR,
          payload:
            error.response.status == 401
              ? "Invalid Username / Password"
              : "Error logging in, try again later"
        });
      });
  };
}

export function loginOnRefresh() {
  let jwt = sessionStorage.getItem("jwt");
  if (jwt) {
    let parsed = JSON.parse(
      window.atob(
        jwt
          .split(".")[1]
          .replace("-", "+")
          .replace("_", "/")
      )
    );

    if (parsed.exp * 1000 > Date.now()) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      return {
        type: LOGIN,
        payload: parsed.userName
      };
    } else sessionStorage.clear();
  } else {
    return { type: LOGOUT };
    sessionStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function logout(navigationCallback) {
  if (navigationCallback) navigationCallback();

  sessionStorage.clear();
  delete axios.defaults.headers.common["Authorization"];

  return {
    type: LOGOUT
  };
}
