import axios from "axios";

export const SEARCH_OPENFDA = "search_openfda";
export const CLEAR_MEDICINE_DATA = "clear_medicine_data";
export const NO_RESULTS = "no_results";

export function searchOpenFDA(postData, navigationCallback) {
  return dispatch => {
    axios
      .post("http://localhost:64850/Api/Controller/Drug/GetDrug", postData)
      .then(response => {
        if ((response.status = 200)) {
            console.log("resp in action", response)
          if (!response.data.error)
            dispatch({
              type: SEARCH_OPENFDA,
              payload: response
            });
          else {
            dispatch({
              type: NO_RESULTS
            });
          }
        }
      });
  };
}

export function clearMedicineData() {
  return {
    type: CLEAR_MEDICINE_DATA
  };
}
