import {
  GET_PATIENT,
  SAVE_PATIENT,
  UPDATE_PATIENT,
  CLEAR_PATIENT_DATA,
  NO_RESULTS,
  GET_PATIENT_ERROR,
  SAVE_PATIENT_ERROR,
  UPDATE_PATIENT_ERROR
} from "../actions/patient-actions";


const initialState = {
  noSuccess: false,
  patientDetails: null,
  noResults: false,
  errors: null
}


export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PATIENT:
      return { patientDetails: action.payload };
    case SAVE_PATIENT:
       console.log("in redu save patient no error ?", action);
    
      return { patientDetails: action.payload.data.Data.Patient };
    case UPDATE_PATIENT:
      return {...state, noSuccess: false}
    case NO_RESULTS:
      return { noResults: true };
    case GET_PATIENT_ERROR:
    case SAVE_PATIENT_ERROR:
    case UPDATE_PATIENT_ERROR:
      console.log("err in redu", action);
      return {...state, noSuccess: true, errors: action.payload };
    case CLEAR_PATIENT_DATA:
      return {};
    default:
      return state;
  }
}
