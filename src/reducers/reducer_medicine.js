import {
  SEARCH_OPENFDA,
  CLEAR_MEDICINE_DATA,
  NO_RESULTS,
  SELECT_RESULT,
  GET_PRESCRIPTIONS,
  GET_PRESCRIPTION_DETAIL,
  UPDATE_PRESCRIPTION
} from "../actions/medicine-actions";

const initialState = {
  searchResults: null,
  prescriptionsDetail: null,
  prescriptionDetail: null,
  noResults: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_RESULT:
      return { ...state, medicineDetails: action.payload };
    case SEARCH_OPENFDA:
    console.log("action in reducer OPENFDA", action);
    
      return { ...state, searchResults: action.payload.results };
    case GET_PRESCRIPTIONS:
      return { prescriptionsDetail: action.payload };
    case GET_PRESCRIPTION_DETAIL:
      console.log("action in reducer", action);
    
      return { ...state, prescriptionDetail: action.payload }
    case NO_RESULTS:
      return { noResults: true };
    case CLEAR_MEDICINE_DATA:
      return initialState;
    default:
      return state;
  }
}
