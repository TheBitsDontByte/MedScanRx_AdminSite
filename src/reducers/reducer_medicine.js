import {
  SEARCH_OPENFDA,
  CLEAR_MEDICINE_DATA,
  NO_RESULTS,
  SELECT_RESULT,
  GET_PRESCRIPTIONS
} from "../actions/medicine-actions";

const initialState = {
  searchResults: {},
  prescriptionDetail: {},
  noResults: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_RESULT:
      return { medicineDetails: action.payload };
    case SEARCH_OPENFDA:
      return { searchResults: action.payload.results };
    case GET_PRESCRIPTIONS:
      console.log("action in reducer", action);
      return { prescriptionDetail: action.payload };
    case NO_RESULTS:
      return { noResults: true };
    case CLEAR_MEDICINE_DATA:
      return initialState;
    default:
      return state;
  }
}
