import { LOGIN, LOGOUT } from '../actions/auth-actions'

export default function(state = {}, action) {
    switch(action.type) {
        case LOGIN: 
            return { isLoggedIn: true, userName: action.payload.userName};
        case LOGOUT:
            return { isLoggedIn: false, userName: null }
        default:
            return state;
    }
}