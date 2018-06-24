import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { clearData } from "../actions/patient-actions";
import { Button } from "react-bootstrap";
import AllPatientSearch from "./Patient/AllPatientSearch";
import SubMenuBox from "./shared/SubMenuBox";

class MainMenu extends Component {
  componentWillMount() {
    this.props.clearData();
  }

  render() {
    return (
      <div className="row">
        <div className="row main-menu-container" style={{ paddingTop: 50 }}>
          <SubMenuBox label="Patients">
            <Button
              bsStyle="primary"
              bsSize="lg"
              componentClass={Link}
              to="/Patient/Add"
              className="main-menu-button"
            >
              Add a Patient
            </Button>
            <Button
              bsStyle="primary"
              bsSize="lg"
              componentClass={Link}
              to="/Search/AllPatients"
              className="main-menu-button"
            >
              Search Patients
            </Button>
          </SubMenuBox>
          <SubMenuBox label="Administration">
            <Button bsStyle="primary" bsSize="lg" className="main-menu-button">
              Admin (coming soon...)
            </Button>
          </SubMenuBox>
          <SubMenuBox label="Analytics">
            <Button bsStyle="primary" bsSize="lg" className="main-menu-button">
              Analytics (coming soon...)
            </Button>
          </SubMenuBox>
        </div>
        <div className="row" style={{ paddingTop: "25px" }}>
          <div className="col-md-6 text-center" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { loginName: state.authentication.userName };
}

export default connect(
  mapStateToProps,
  { clearData }
)(MainMenu);
