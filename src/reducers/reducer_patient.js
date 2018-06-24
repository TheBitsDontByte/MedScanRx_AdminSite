import {
  GET_PATIENT,
  SAVE_PATIENT,
  UPDATE_PATIENT,
  CLEAR_PATIENT_DATA,
  GET_PATIENT_ERROR,
  SAVE_PATIENT_ERROR,
  UPDATE_PATIENT_ERROR,
  CLEAR_PATIENT_ERRORS,
  SEARCHING
} from "../actions/patient-actions";

const initialState = {
  noSuccess: null,
  patientDetails: null,

  errors: null,
  isSearching: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PATIENT:
      return { patientDetails: action.payload };
    case SAVE_PATIENT:
      return { patientDetails: action.payload.data.Data.Patient };
    case UPDATE_PATIENT:
      return { ...state, noSuccess: null, isSearching: null };
    case GET_PATIENT_ERROR:
    case SAVE_PATIENT_ERROR:
    case UPDATE_PATIENT_ERROR:
      return {
        ...state,
        noSuccess: true,
        errors: action.payload,
        isSearching: null
      };
    case CLEAR_PATIENT_DATA:
      return initialState;
    case CLEAR_PATIENT_ERRORS:
      return { ...state, noSuccess: null, errors: null, isSearching: null };
    case SEARCHING:
      return { isSearching: true };
    default:
      return state;
  }
}
