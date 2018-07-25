import {
  SEARCH_OPENFDA,
  CLEAR_MEDICINE_DATA,
  NO_OPENFDA_RESULTS,
  NO_RXIMAGE_RESULTS,
  SELECT_RESULT,
  GET_PRESCRIPTIONS,
  GET_PRESCRIPTION_DETAIL,
  UPDATE_PRESCRIPTION,
  SEARCH_RXIMAGE,
  MEDICINE_SEARCHING,
  SAVE_PRESCRIPTION_ERROR,
  GET_PRESCRIPTIONS_ERROR,
  GET_PRESCRIPTION_ERROR,
  UPDATE_PRESCRIPTION_ERROR,
  DELETE_PRESCRIPTION_ERROR
} from "../actions/medicine-actions";
import { UPDATE_PATIENT_ERROR } from "../actions/patient-actions";

const initialState = {
  openfdaSearchResults: null,
  rximageSearchResults: null,
  prescriptionsDetail: null,
  prescriptionDetail: null,
  noSuccess: null,
  errors: null,
  isSearching: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_RESULT:
      return { medicineDetails: action.payload };
    case SEARCH_OPENFDA:
      return { ...state, openfdaSearchResults: action.payload, isSearching: null };
    case SEARCH_RXIMAGE:
      return { ...state, rximageSearchResults: action.payload, isSearching: null };
    case GET_PRESCRIPTIONS:
      return { prescriptionsDetail: action.payload };
    case GET_PRESCRIPTION_DETAIL:
      return { ...state, prescriptionDetail: action.payload };
    case NO_OPENFDA_RESULTS:
      return { ...state, openfdaErrors: action.payload, noSuccess: true, isSearching: null};
    case NO_RXIMAGE_RESULTS:
      return { ...state, rximageErrors: action.payload, noSuccess: true, isSearching: null };
    case MEDICINE_SEARCHING:
      return { isSearching: true };
    case CLEAR_MEDICINE_DATA:
      return initialState;
    case SAVE_PRESCRIPTION_ERROR:
    case GET_PRESCRIPTIONS_ERROR:
    case GET_PRESCRIPTION_ERROR:
    case UPDATE_PRESCRIPTION_ERROR:
    case DELETE_PRESCRIPTION_ERROR:
      return { ...state, noSuccess: true, errors: action.payload}
    default:
      return state;
  }
}
