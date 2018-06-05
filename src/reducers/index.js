import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import reducer_patient from './reducer_patient'
import reducer_login from './reducer_login';
import reducer_medicine from './reducer_medicine';

const rootReducer = combineReducers({
  patients: reducer_patient,
  authentication: reducer_login,
  medicine: reducer_medicine,
  form: formReducer,
});

export default rootReducer;
