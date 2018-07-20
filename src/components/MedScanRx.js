//Node packages
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import thunk from "redux-thunk";

//Custom components
import Header from "./header-footer/Header";
import Footer from "./header-footer/Footer";
import PrivateRoute from "./shared/PrivateRoute";
import LoginPage from "./LoginPage";
import MainMenu from "./MainMenu";
import AddPatient from "./Patient/AddPatient";
import EditPatient from "./Patient/EditPatient";
import PatientDetail from "./Patient/PatientDetail";
import AllPatientSearch from "./Patient/AllPatientSearch";
import AddOpenfdaMedicine from "./Medicine/AddOpenfdaMedicine";
import AddRximageMedicine from "./Medicine/AddRximageMedicine";
import SearchMedicine from "./Medicine/SearchMedicine";
import Redirect from "./RedirectPage";
import EditPrescription from "./Medicine/EditPrescription";

import { login } from "../actions/auth-actions";

import reducers from "../reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

class MedScanRx extends Component {
  componentWillMount() {
    let loggedIn = JSON.parse(sessionStorage.getItem("userInfo"));
    if (!loggedIn) {
      console.log("not logged in");
    } else {
      console.log("Loggedin", loggedIn);
      this.props.login(loggedIn, null)
    }
  }

  render() {
    return (
      <BrowserRouter>
      <div>
        <Header />
        <div className="body">
          <Switch>
            <PrivateRoute
              path="/Search/AllPatients"
              component={AllPatientSearch}
            />
            <PrivateRoute path="/Patient/Add" component={AddPatient} />
            <PrivateRoute
              exact
              path="/Patient/:patientId/EditPrescription/:prescriptionId"
              component={EditPrescription}
            />
            <PrivateRoute
              exact
              path="/Patient/:patientId/SearchMedicine"
              component={SearchMedicine}
            />
            <PrivateRoute
              exact
              path="/Patient/:patientId/AddRxImageMedicine"
              component={AddRximageMedicine}
            />
            <PrivateRoute
              exact
              path="/Patient/:patientId/AddOpenFdaMedicine"
              component={AddOpenfdaMedicine}
            />

            <PrivateRoute
              exact
              path="/Patient/:patientId/Edit"
              component={EditPatient}
            />
            <PrivateRoute
              exact
              path="/Patient/:patientId"
              component={PatientDetail}
            />
            <PrivateRoute path="/MainMenu" component={MainMenu} />
            <Route exact path="/" component={LoginPage} />

            <Route component={Redirect} />
          </Switch>
        </div>
        <Footer />
      </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { login }
)(MedScanRx);
