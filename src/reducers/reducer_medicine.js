import { SEARCH_OPENFDA, CLEAR_MEDICINE_DATA, NO_RESULTS } from '../actions/medicine-actions';

const initialState = {
    searchResults: {},
    noResults: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SEARCH_OPENFDA:
            return { searchResults: action.payload.data.results}
        case NO_RESULTS:
            return { noResults: true }
        case CLEAR_MEDICINE_DATA:
            return initialState;
        default:
            return state;
    }
}