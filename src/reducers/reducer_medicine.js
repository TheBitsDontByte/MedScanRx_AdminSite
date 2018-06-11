import {
  SEARCH_OPENFDA,
  CLEAR_MEDICINE_DATA,
  NO_RESULTS,
  SELECT_RESULT
} from "../actions/medicine-actions";

const initialState = {
  searchResults: {},
  noResults: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_RESULT:
      console.log("action in reducer", action);
      return { medicineDetails: action.payload };
    case SEARCH_OPENFDA:
      return { searchResults: action.payload.results };
    case NO_RESULTS:
      return { noResults: true };
    case CLEAR_MEDICINE_DATA:
      return initialState;
    default:
      return state;
  }
}
