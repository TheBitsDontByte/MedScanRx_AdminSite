import { LOGIN, LOGOUT, LOGIN_ERROR } from "../actions/auth-actions";

const initialState = {
    isLoggedIn: false,
    userName: null,
    success: null,
    error: null
}

export default function(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      console.log("Logging in", action);
      return { isLoggedIn: true, userName: action.payload };
    case LOGOUT:
      return { isLoggedIn: false, userName: null };
    case LOGIN_ERROR:
    console.log("error repsones", )
      return { isLoggedIn: false, success: false, errors: action.payload };
    default:
      return state;
  }
}
