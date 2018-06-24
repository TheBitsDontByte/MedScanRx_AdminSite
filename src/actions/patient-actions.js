import axios from "axios";
import { BASE_URL, NETWORK_ERROR_MESSAGE } from "../globals";

export const UPDATE_PATIENT = "edit_patient";
export const CLEAR_PATIENT_DATA = "clear_patient_data";
export const GET_PATIENT = "get_patient";
export const SAVE_PATIENT = "save_patient";

export const GET_PATIENT_ERROR = "get_patient_error";
export const UPDATE_PATIENT_ERROR = "update_patient_error";
export const SAVE_PATIENT_ERROR = "save_patient_error";
export const CLEAR_PATIENT_ERRORS = "clear_patient_errors";
export const SEARCHING = "searching";

export function savePatient(postData, navigationCallback) {
  return dispatch => {
    axios({
      method: "POST",
      url: BASE_URL + "/api/Patient/SavePatient",
      data: postData,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    })
      .then(response => {
        navigationCallback("/Patient/" + response.data.patientId);
      })
      .catch(error => {
        let errorMessages = error.response
          ? error.response.data.errors
          : NETWORK_ERROR_MESSAGE;
        dispatch({ type: SAVE_PATIENT_ERROR, payload: errorMessages });
      });
  };
}

export function getPatient(patientId, navigationCallback) {
  return dispatch => {
    axios
      .get(BASE_URL + "/api/Patient/" + patientId)
      .then(response => {
        navigationCallback ? navigationCallback() : null;
        dispatch({
          type: GET_PATIENT,
          payload: response.data
        });
      })
      .catch(error => {
        let errorMessages = error.response
          ? error.response.data.errors
          : NETWORK_ERROR_MESSAGE;
        dispatch({ type: GET_PATIENT_ERROR, payload: errorMessages });
      });
  };
}

export function updatePatient(putData, navigationCallback) {
  return dispatch => {
    axios
      .put(BASE_URL + "/api/Patient/UpdatePatient", putData)
      .then(response => {
        dispatch({
          type: UPDATE_PATIENT
        });
        if (navigationCallback)
          navigationCallback("/Patient/" + response.data.patientId);
      })
      .catch(error => {
        let errorMessages = error.response
          ? error.response.data.errors
          : NETWORK_ERROR_MESSAGE;
        dispatch({ type: UPDATE_PATIENT_ERROR, payload: errorMessages });
      });
  };
}

export function clearData() {
  return {
    type: CLEAR_PATIENT_DATA
  };
}

export function clearErrors() {
  return {
    type: CLEAR_PATIENT_ERRORS
  };
}

export const searching = () => {
  return {
    type: SEARCHING
  };
};
