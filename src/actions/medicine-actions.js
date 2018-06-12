import axios from "axios";

import { BASE_URL } from "../globals";

export const SEARCH_OPENFDA = "search_openfda";
export const CLEAR_MEDICINE_DATA = "clear_medicine_data";
export const NO_RESULTS = "no_results";
export const SELECT_RESULT = "select_result";
export const SAVE_PRESCRIPTION = "save_prescription";

export function searchOpenFDA(postData, navigationCallback) {
  return dispatch => {
    axios
      .post(`${BASE_URL}/Api/Prescription/Search`, postData)
      .then(response => {
        if ((response.status = 200)) {
          dispatch({
            type: SEARCH_OPENFDA,
            payload: JSON.parse(response.data)
          });
        }
      })
      .catch(response => {
        dispatch({
          type: NO_RESULTS,
        })
      });
  };
}

export function savePrescription(postData, navigationCallback) {
  return dispatch => {
    axios.post(`${BASE_URL}/Api/Prescription/Save`, postData)
    .then(response => {
      if (response.status == 200) {
        dispatch({
          type: SAVE_PRESCRIPTION,
        })
        if(navigationCallback)
          navigationCallback("/Patient/"+postData.patientId);
      }
    })
    .catch(response => {

    });
  }
}

export function selectOpenFdaResult(selection) {
  return {
    type: SELECT_RESULT,
    payload: selection
  }
}

export function clearMedicineData() {
  return {
    type: CLEAR_MEDICINE_DATA
  };
}
