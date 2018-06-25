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
  MEDICINE_SEARCHING
} from "../actions/medicine-actions";

const initialState = {
  openfdaSearchResults: null,
  rximageSearchResults: null,
  prescriptionsDetail: null,
  prescriptionDetail: null,
  noSuccess: null,
  isSearching: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_RESULT:
      return { ...state, medicineDetails: action.payload };
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
      console.log("No results in reducer", action.payload);
      return { ...state, rximageErrors: action.payload, noSuccess: true, isSearching: null };
    case MEDICINE_SEARCHING:
      return { isSearching: true };
    case CLEAR_MEDICINE_DATA:
      return initialState;
    default:
      return state;
  }
}
