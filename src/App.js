//Node packages
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import thunk from "redux-thunk";

//Custom components
import Header from "./components/header-footer/Header";
import Footer from "./components/header-footer/Footer";
import PrivateRoute from "./components/shared/PrivateRoute";
import LoginPage from "./components/LoginPage";
import MainMenu from "./components/MainMenu";
import AddPatient from "./components/Patient/AddPatient";
import EditPatient from "./components/Patient/EditPatient";
import PatientDetail from "./components/Patient/PatientDetail";
import AllPatientSearch from "./components/Patient/AllPatientSearch";
import SearchMedicine from "./components/Medicine/SearchMedicine";
import AddMedicine from "./components/Medicine/AddMedicine";
import RedirectPage from "./components/RedirectPage";
import EditPrescription from "./components/Medicine/EditPrescription";

//misc
import reducers from "./reducers";
import logo from "./logo.svg";
import "./App.css";
import Redirect from "react-router-dom/Redirect";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
                  path="/Patient/:patientId/AddMedicine"
                  component={AddMedicine}
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

                <Route component={RedirectPage} />
                {/* Think of  abeter way to deal with this */}
              </Switch>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
