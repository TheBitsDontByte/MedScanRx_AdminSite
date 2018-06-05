// import axios from "axios";

// export const ADD_PATIENT_TO_STORE = "add_patient";
// export const SEARCH_CURRENT_PATIENTS = 'search_patients';
// export const SEARCH_ALL_PATIENTS = "search_all_patients";
// export const LOGIN = "login";
// export const LOGOUT = "logout";
// export const EDIT_PATIENT = "edit_patient";
// export const CLEAR_PATIENT_DATA = "clear_patient_data";
// export const NO_PATIENTS_FOUND = "no_patients_found";
// export const GET_PATIENT_DATA = "get_patient_data";
// export const GET_PATIENT = "get_patient";
// export const SAVE_PATIENT = "save_patient";

// const BASE_URL = "http://localhost:49984";

// export function addPatientToStore(data, navigationCallback) {
//     navigationCallback();
//     return {
//         type: ADD_PATIENT_TO_STORE,
//         payload: data
//     };
// }
// export function savePatient(postData, navigationCallback, urlMinusId) {
//     //Actual api call here to save the patient
//     //get id from here(this seems stupid, how did he do it ...)
//     postData = {...postData, patientId: 10};
//     let url = urlMinusId + postData.patientId;
//     console.log(postData);
//     const response = axios.post(BASE_URL+"/Api/Controller/Patients/AddPatient", postData)
//         .then(() => { navigationCallback(url); }); 

//     return {
//         type: SAVE_PATIENT,
//         payload: response
//     };
// }


// export function searchAllPatients(patientId) {
//     const response = axios.get(BASE_URL+"/Api/Controller/Patient/" + patientId)
//     // const response = axios.get(BASE_URL+"/api/controller/patients/patient/" + patientId);

//     return {
//         type: GET_PATIENT,
//         payload: response
//     }
// }

// export function getPatient(patientId, navigationCallback) {
//     const response = axios.get(BASE_URL+"/Api/Controller/Patient/" + patientId)
//         .then(() => navigationCallback());
    
//     // const response = axios.get(BASE_URL+"/api/controller/patients/patient/" + patientId)
//     //     .then(() => navigationCallback());
//     return {
//         type: GET_PATIENT,
//         payload: response
//     }
// }

// export function searchCurrentPatients(searchTerms) {
//     //axios here
//     //not currently in use

//     let patients = [
//         {
//             patientId: 1,
//             firstName: "Chris",
//             lastName: "Andrews",
//             dateOfBirth: "05/31/1983",
//             gender: "M"
//         },
//         {
//             patientId: 2,
//             firstName: "Steven",
//             lastName: "Luangrath",
//             dateOfBirth: "05/20/1965",
//             gender: "F"
//         },
//         {
//             patientId: 3,
//             firstName: "Cole",
//             lastName: "Schmidt",
//             dateOfBirth: "11/01/1993",
//             gender: "M"
//         }, 
//         {
//             patientId: 4,
//             firstName: "David",
//             lastName: "O'Keeffeeeee",
//             dateOfBirth: "11/01/1903",
//             gender: "F"
//         }
//     ];

    
// }


// export function editPatient(editData) {
//     return {
//         type: EDIT_PATIENT,
//         payload: editData
//     }
// }


// //Authentication & Login & Logout
// export function login(loginData, navigationCallback) {
//     //login call here, navCallback in the .then for the promise.
//     // ~.com/api/v1/login with username and password
//     console.log("Logging in ", loginData.userName, " with password ", loginData.password);

//     navigationCallback();
//     return {
//         type: LOGIN,
//         payload: loginData
//     }
// }

// export function logout(navigationCallback) {
//     navigationCallback();
//     return {
//         type: LOGOUT,
//     }

// }

// export function handleMainMenuClick() {
    
//     return {
//         type: CLEAR_PATIENT_DATA
//     }
// }

