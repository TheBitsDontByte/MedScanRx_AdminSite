import {
  LOGIN,
  LOGOUT,
  LOGIN_ERROR,
  CLEAR_ERRORS_BEFORE_LOGIN
} from "../actions/auth-actions";

const initialState = {
  isLoggedIn: false,
  userName: null,
  success: null,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { isLoggedIn: true, userName: action.payload };
    case LOGOUT:
      return { isLoggedIn: false, userName: null };
    case LOGIN_ERROR:
      return { isLoggedIn: false, success: false, errors: action.payload };
    case CLEAR_ERRORS_BEFORE_LOGIN:
      return initialState;
    default:
      return state;
  }
}
