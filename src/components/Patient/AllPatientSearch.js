import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import moment from "moment";
import _ from "lodash";

import { getPatient, searching } from "../../actions/patient-actions";
import { maxLength8 } from "../shared/Validate";

class AllPatientSearch extends React.Component {
  handlePatientClick(patientId) {
    this.props.getPatient(patientId, () =>
      this.props.history.push("/Patient/" + patientId)
    );
  }

  renderMatchingPatients() {
    if (this.props.isSearching)
      return <h4 className="patient-search-info-box">Searching ...</h4>;

    if (this.props.noSuccess)
      return (
        <h4 className="patient-search-info-box text-danger">
          {typeof this.props.errors == "string"
            ? this.props.errors
            : _.map(this.props.errors, error => {
                return <div className="row">{error}</div>;
              })}
        </h4>
      );
    if (!this.props.patientDetails)
      return (
        <h4 className="patient-search-info-box">
          Enter a Patient ID and Search ...
        </h4>
      );

    const patientDetails = this.props.patientDetails;
    return (
      <div>
        <h4 className="text-center">Patient</h4>
        {/* TODO Format this better seeing as only ever ONE patient returnecd */}
        <li
          className="list-group-item"
          onClick={() => this.handlePatientClick(patientDetails.patientId)}
        >
          <strong>Name:</strong>{" "}
          {patientDetails.firstName + " " + patientDetails.lastName} <br />
          <strong>PatientId:</strong> {patientDetails.patientId} <br />
          {/* <strong>Date of Birth:</strong> {moment(Patient.DateOfBirth, "MM/dd/yyyy")} */}
          <strong>Date of Birth:</strong>{" "}
          {moment(patientDetails.dateOfBirth).toString()}
        </li>
      </div>
    );
  }

  renderField(field) {
    const { touched, error } = field.meta;
    const className = `form-group ${touched && error ? "has-error" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control "
          type="text"
          {...field.input}
          autoComplete="off"
        />
        <div className="text-danger">{touched ? error : ""}</div>
      </div>
    );
  }

  handleChange(event) {
    this.setState({ patientId: event.target.value });
  }

  handleSearchClick() {
    this.props.searching();
    this.props.getPatient(this.state.patientId);
  }

  render() {
    const { handleSubmit, isSearching } = this.props;
    return (
      <div>
        <div className="row">
          <h2>Search All Patients</h2>
        </div>
        <div className="row">
          <form
            className="form-group"
            onSubmit={handleSubmit(() => this.handleSearchClick())}
          >
            <div className="col-sm-12 col-md-6 col-lg-4">
              <h4>Search By Patient ID</h4>
              <Field
                component={this.renderField}
                label="Patient ID:"
                name="patientId"
                onChange={this.handleChange.bind(this)}
                validate={maxLength8}
              />
              <Button
                type="submit"
                bsStyle="success"
                className="pull-right"
                disabled={isSearching}
              >
                Search
              </Button>
              <Button
                to="/Patient/Add"
                bsStyle="primary"
                className="pull-right margin-right"
                componentClass={Link}
                disabled={isSearching}
              >
                Add New Patient
              </Button>
              <Button
                to="/MainMenu"
                bsStyle="danger"
                className="pull-right margin-right"
                componentClass={Link}
                disabled={isSearching}
              >
                Main Menu
              </Button>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <ul className="list-group">{this.renderMatchingPatients()}</ul>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.patientId) errors.patientId = "Must enter a Patient ID to search";

  return errors;
}

function mapStateToProps(state) {
  return {
    patientDetails: state.patients.patientDetails,
    noResults: state.patients.noResults,
    noSuccess: state.patients.noSuccess,
    isSearching: state.patients.isSearching,
    errors: state.patients.errors
  };
}

export default reduxForm({
  validate,
  form: "AllPatientSearch"
})(
  connect(
    mapStateToProps,
    { getPatient, searching }
  )(AllPatientSearch)
);
