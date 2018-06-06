import axios from "axios";
import { BASE_URL } from "../globals";


export const UPDATE_PATIENT = "edit_patient";
export const CLEAR_PATIENT_DATA = "clear_patient_data";
export const GET_PATIENT = "get_patient";
export const SAVE_PATIENT = "save_patient";
export const NO_RESULTS = "no_results";
export const GET_PATIENT_ERROR = "get_patient_error";
export const UPDATE_PATIENT_ERROR = "update_patient_error";


export function savePatient(postData, navigationCallback) {
  return dispatch => {
    axios({
      method: "POST",
      url: BASE_URL + "/api/Patient/SavePatient",
      data: JSON.stringify(postData),
      headers: {"Content-Type": "application/json; charset=utf-8"}  
      })
      .then(response => {
        if (response.status >= 200 && response.status < 300)
          navigationCallback("/Patient/" + response.data.patientId);
      })
      .catch(response => console.log("SuperErrorINSavePatientaction", response));
  };
}

export function getPatient(patientId, navigationCallback) {
  return dispatch => {
    axios
      .get(BASE_URL + "/api/Patient/" + patientId)
      .then(response => {
        console.log("GetPatientHere response=", response, navigationCallback)
        if (response.status == 200) {
          if (response.data.result) {
            navigationCallback ? navigationCallback() : null;
            dispatch({
              type: GET_PATIENT,
              payload: response.data.result
            });
          } else if (response.data.Patient == null) {
            dispatch({
              type: NO_RESULTS
            });
          }
        } else {
          //DO I NEED THIS HERE CAUSE O FWHATS BELOW ????
          console.log("here, error");
          dispatch({
            type: GET_PATIENT_ERROR
          });
        }
      })
      .catch(() => {
        console.log("here");
        dispatch({
          type: GET_PATIENT_ERROR
        });
      });
  };
}

export function updatePatient(putData, navigationCallback) {
  //Need axios call
  return dispatch => {
    axios
      .put(BASE_URL + "/Api/Controller/Patient/UpdatePatient", putData)
      .then(response => {
        if (response.status == 200) {
          console.log("response in action", response);
          if (navigationCallback)
            navigationCallback("/Patient/" + putData.patient.patientId);
          dispatch({
            type: UPDATE_PATIENT
          });
        } else {
          dispatch({
            type: NO_RESULTS
          });
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
