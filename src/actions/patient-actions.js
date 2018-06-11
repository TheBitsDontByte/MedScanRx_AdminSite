import axios from "axios";
import { BASE_URL } from "../globals";

export const UPDATE_PATIENT = "edit_patient";
export const CLEAR_PATIENT_DATA = "clear_patient_data";
export const GET_PATIENT = "get_patient";
export const SAVE_PATIENT = "save_patient";
export const NO_RESULTS = "no_results";
export const GET_PATIENT_ERROR = "get_patient_error";
export const UPDATE_PATIENT_ERROR = "update_patient_error";
export const SAVE_PATIENT_ERROR = "save_patient_error";

export function savePatient(postData, navigationCallback) {
  return dispatch => {
    axios({
      method: "POST",
      url: BASE_URL + "/api/Patient/SavePatient",
      data: postData,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300)
          navigationCallback("/Patient/" + response.data.patientId);
      })
      .catch((error) => {
        error = error.response ? error.response.data : "Something went very wrong";
        dispatch({ type: SAVE_PATIENT_ERROR, payload: error })
      }); 
  };
}

export function getPatient(patientId, navigationCallback) {
  return dispatch => {
    axios
      .get(BASE_URL + "/api/Patient/" + patientId)
      .then(response => {
        if (response.status == 200) {
          navigationCallback ? navigationCallback() : null;
          dispatch({
            type: GET_PATIENT,
            payload: response.data
          });
        } else if (response.status == 204) {
          dispatch({ type: NO_RESULTS });
        }
      })
      .catch(() => {
        dispatch({ type: GET_PATIENT_ERROR });
      });
  };
}

export function updatePatient(putData, navigationCallback) {
  //Need axios call
  return dispatch => {
    axios
      .put(BASE_URL + "/api/Patient/UpdatePatient", putData)
      .then(response => {
        if (response.status == 200) {
          console.log("response in action", response);

          dispatch({
            type: UPDATE_PATIENT
          });
          if (navigationCallback)
            navigationCallback("/Patient/" + response.data.patientId);
        }
      })
      .catch(() => {
        dispatch({
          type: UPDATE_PATIENT_ERROR
        });
      });
  };

  console.log("In dat update patient boooooi");
  return {
    type: UPDATE_PATIENT,
    payload: putData
  };
}

export function clearData() {
  return {
    type: CLEAR_PATIENT_DATA
  };
}
