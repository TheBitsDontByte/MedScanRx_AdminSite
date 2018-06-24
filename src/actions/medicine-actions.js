import axios from "axios";

import { BASE_URL, NETWORK_ERROR_MESSAGE } from "../globals";

export const SEARCH_RXIMAGE = "search_openfda";
export const CLEAR_MEDICINE_DATA = "clear_medicine_data";
export const NO_RESULTS = "no_results";
export const SELECT_RESULT = "select_result";
export const SAVE_PRESCRIPTION = "save_prescription";
export const GET_PRESCRIPTIONS = "get_prescriptions";
export const GET_PRESCRIPTION_DETAIL = "get_prescription_detail";
export const UPDATE_PRESCRIPTION = "update_prescription";
export const DELETE_PRESCRIPTION = "delete_prescription";
export const SEARCH_ERROR = "search_error";

export function searchRxImage(postData, navigationCallback) {
  return dispatch => {
    axios
      .post(`${BASE_URL}/Api/Prescription/Search`, postData)
      .then(response => {
        let jsonData = JSON.parse(response.data);
        console.log("Returned data ", jsonData)
        if (jsonData.nlmRxImages.length == 0) {
          dispatch({ type: NO_RESULTS });
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
        dispatch({ type: SEARCH_ERROR, payload: errorMessages });
      });
  };
}

export function savePrescription(postData, navigationCallback) {
  return dispatch => {
    axios
      .post(`${BASE_URL}/Api/Prescription/Save`, postData)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: SAVE_PRESCRIPTION
          });
          if (navigationCallback)
            navigationCallback(`/Patient/${postData.patientId}`);
        }
      })
      .catch(response => {});
  };
}

export function selectOpenFdaResult(selection) {
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
        console.log("Response for get all prescrip", response);
        dispatch({
          type: GET_PRESCRIPTIONS,
          payload: response.data
        });
      })
      .catch(response => {
        console.log("Need error handling all up in prescriptions :\\");
      });
  };
}

export const getPrescriptionDetail = prescriptionId => {
  return dispatch => {
    axios
      .get(`${BASE_URL}/Api/Prescription/Prescription/${prescriptionId}`)
      .then(response => {
        if (response.status == 200)
          dispatch({
            type: GET_PRESCRIPTION_DETAIL,
            payload: response.data
          });
      })
      .catch(response => {
        console.log("hurr durr Im an error and need to be handled", response);
      });
  };
};

export const updatePrescription = (postData, navigationCallback) => {
  return dispatch => {
    axios
      .post(`${BASE_URL}/Api/Prescription/UpdatePrescription`, postData)
      .then(response => {
        dispatch({
          type: UPDATE_PRESCRIPTION
        });

        if (navigationCallback)
          navigationCallback(`/Patient/${postData.patientId}`);
      })
      .catch(response => {});
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
        dispatch({
          type: DELETE_PRESCRIPTION
        });
        if (navigationCallback) navigationCallback(); //`/Patient/${patientId}`)
      })
      .catch(response => {
        console.log("so much to do with cleaning this guy up :\\");
      });
  };
};

export function clearMedicineData() {
  return {
    type: CLEAR_MEDICINE_DATA
  };
}
