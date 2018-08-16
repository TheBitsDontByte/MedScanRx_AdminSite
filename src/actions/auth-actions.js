import axios from "axios";
import { BASE_URL } from "../globals/index";

export const LOGIN = "login";
export const LOGOUT = "logout";
export const LOGIN_ERROR = "login_failure";

//Authentication & Login & Logout
export function login(loginData, navigationCallback) {
  return dispatch => {
    axios
      .post(`${BASE_URL}/api/auth/admin/login`, loginData)
      .then(response => {
        sessionStorage.setItem("userName", loginData.userName);
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
          payload: error.response.status == 401 ? "Invalid Username / Password" : "Error logging in, try again later"
        });
      });
  };
}

export function loginOnRefresh(userName, jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  return {
    type: LOGIN,
    payload: userName
  };
}

export function logout(navigationCallback) {
  if (navigationCallback) navigationCallback();
  sessionStorage.clear();

  return {
    type: LOGOUT
  };
}
