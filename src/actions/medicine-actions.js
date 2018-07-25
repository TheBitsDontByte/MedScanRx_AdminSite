import axios from "axios";

import { BASE_URL, NETWORK_ERROR_MESSAGE } from "../globals";

export const SEARCH_RXIMAGE = "search_rximage";
export const CLEAR_MEDICINE_DATA = "clear_medicine_data";
export const NO_RXIMAGE_RESULTS = "no__rximage_results";
export const NO_OPENFDA_RESULTS = "no_openfda_results";
export const MEDICINE_SEARCHING = "medicine_searching";
export const SELECT_RESULT = "select_result";
export const SAVE_PRESCRIPTION = "save_prescription";
export const GET_PRESCRIPTIONS = "get_prescriptions";
export const GET_PRESCRIPTION_DETAIL = "get_prescription_detail";
export const UPDATE_PRESCRIPTION = "update_prescription";
export const DELETE_PRESCRIPTION = "delete_prescription";
export const SEARCH_ERROR = "search_error";
export const SEARCH_OPENFDA = "search_openfda";
export const SAVE_PRESCRIPTION_ERROR = "save_prescription_error";
export const GET_PRESCRIPTIONS_ERROR = "get_prescriptions_error";
export const GET_PRESCRIPTION_ERROR = "get_prescription_error";
export const UPDATE_PRESCRIPTION_ERROR = "update_prescription_error";
export const DELETE_PRESCRIPTION_ERROR = "delete_prescription_error";

export function searchOpenFDA(postData, navigationCallback) {
  return dispatch => {
    axios
      .post(`${BASE_URL}/Api/Prescription/SearchOpenfda`, postData)
      .then(response => {
        let jsonData = JSON.parse(response.data);
        dispatch({
          type: SEARCH_OPENFDA,
          payload: jsonData.results
        });
      })
      .catch(error => {
        let errorMessages = error.response
          ? error.response.data.errors
          : NETWORK_ERROR_MESSAGE;
        dispatch({ type: NO_OPENFDA_RESULTS, payload: errorMessages });
      });
  };
}

export function searchOpenFDARxcui(rxcui, navigationCallback) {
  return dispatch => {
    axios
      .get(`${BASE_URL}/Api/Prescription/SearchOpenfda/${rxcui}`)
      .then(response => {
        let jsonData = JSON.parse(response.data);
        dispatch({
          type: SEARCH_OPENFDA,
          payload: jsonData.results
        });
      })
      .catch(error => {
        let errorMessages = error.response
          ? error.response.data.errors
          : NETWORK_ERROR_MESSAGE;
        dispatch({ type: NO_OPENFDA_RESULTS, payload: errorMessages });
      });
  };
}

export function searchRxImage(postData, navigationCallback) {
  return dispatch => {
    axios
      .post(`${BASE_URL}/Api/Prescription/SearchRxcui`, postData)
      .then(response => {
        let jsonData = JSON.parse(response.data);
        if (jsonData.nlmRxImages.length === 0) {
          dispatch({
            type: NO_RXIMAGE_RESULTS,
            payload: "No medicines found with those search terms"
          });
        } else {
          dispatch({
            type: SEARCH_RXIMAGE,
            payload: jsonData
          });
        }
      })
      .catch(error => {
        let errorMessages = error.response
          ? error.response.data.errors
          : NETWORK_ERROR_MESSAGE;
        dispatch({ type: NO_RXIMAGE_RESULTS, payload: errorMessages });
      });
  };
}

export function savePrescription(postData, navigationCallback) {
  return dispatch => {
    axios
      .post(`${BASE_URL}/Api/Prescription/Save`, postData)
      .then(response => {
        dispatch({
          type: SAVE_PRESCRIPTION
        });
        if (navigationCallback)
          navigationCallback("/Patient/" + postData.patientId);
      })
      .catch(error => {
        let errorMessages = error.response
          ? error.response.data.errors
          : NETWORK_ERROR_MESSAGE;
        dispatch({ type: SAVE_PRESCRIPTION_ERROR, payload: errorMessages });
      });
  };
}

export function selectOpenFdaResult(selection) {
  return {
    type: SELECT_RESULT,
    payload: selection
  };
}

export function selectRxImageResult(selection) {
  return {
    type: SELECT_RESULT,
    payload: selection
  };
}

export function getPrescriptions(patientId) {
  return dispatch => {
    axios
      .get(`${BASE_URL}/Api/Prescription/Prescriptions/${patientId}`)
      .then(response => {
        dispatch({
          type: GET_PRESCRIPTIONS,
          payload: response.data
        });
      })
      .catch(error => {
        let errorMessages = error.response
          ? error.response.data.errors
          : NETWORK_ERROR_MESSAGE;
        dispatch({ type: GET_PRESCRIPTIONS_ERROR, payload: errorMessages });
      });
  };
}

export const getPrescriptionDetail = prescriptionId => {
  return dispatch => {
    axios
      .get(`${BASE_URL}/Api/Prescription/Prescription/${prescriptionId}`)
      .then(response => {
        dispatch({
          type: GET_PRESCRIPTION_DETAIL,
          payload: response.data
        });
      })
      .catch(error => {
        let errorMessages = error.response
          ? error.response.data.errors
          : NETWORK_ERROR_MESSAGE;
        dispatch({ type: GET_PRESCRIPTION_ERROR, payload: errorMessages });
      });
  };
};

export const updatePrescriptionDetail = (putData, navigationCallback) => {
  return dispatch => {
    axios
      .put(`${BASE_URL}/Api/Prescription/UpdatePrescription`, putData)
      .then(response => {
        if (navigationCallback) navigationCallback();
      })
      .catch(error => {
        let errorMessages = error.response
          ? error.response.data.errors
          : NETWORK_ERROR_MESSAGE;
        dispatch({ type: UPDATE_PRESCRIPTION_ERROR, payload: errorMessages });
      });
  };
};

export const deletePrescription = (
  prescriptionId,
  patientId,
  navigationCallback
) => {
  return dispatch => {
    axios
      .delete(
        `${BASE_URL}/Api/Prescription/DeletePrescription?prescriptionId=${prescriptionId}&patientId=${patientId}`
      )
      .then(response => {
        if (navigationCallback) navigationCallback();
      })
      .catch(error => {
        let errorMessages = error.response
          ? error.response.data.errors
          : NETWORK_ERROR_MESSAGE;
        dispatch({ type: DELETE_PRESCRIPTION_ERROR, payload: errorMessages });
      });
  };
};

export const searching = () => {
  return {
    type: MEDICINE_SEARCHING
  };
};

export function clearMedicineData() {
  return {
    type: CLEAR_MEDICINE_DATA
  };
}
