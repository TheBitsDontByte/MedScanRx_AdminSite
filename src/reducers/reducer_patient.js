import {
  GET_PATIENT,
  SAVE_PATIENT,
  UPDATE_PATIENT,
  CLEAR_PATIENT_DATA,
  NO_RESULTS,
  GET_PATIENT_ERROR,
  UPDATE_PATIENT_ERROR
} from "../actions/patient-actions";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_PATIENT:
      return { patientDetails: action.payload };
    case SAVE_PATIENT:
    console.log("in redu save patient no error ?", action);
    
      return { patientDetails: action.payload.data.Data.Patient };
    case NO_RESULTS:
      return { noResults: true };
    case GET_PATIENT_ERROR:
    case UPDATE_PATIENT_ERROR:
      console.log("err in redu");
      return { noSuccess: true };
    case CLEAR_PATIENT_DATA:
      return {};
    default:
      return state;
  }
}
