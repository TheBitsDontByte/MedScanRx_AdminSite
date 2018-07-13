//Node packages
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import thunk from "redux-thunk";

import MedScanRx from './components/MedScanRx'


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
        
          <MedScanRx />
       
      </Provider>
    );
  }
}

export default App;
