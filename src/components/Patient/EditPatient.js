import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link, Prompt } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import {
  updatePatient,
  getPatient,
  clearErrors
} from "../../actions/patient-actions";

import AddEditFields from "../shared/AddEditFields";
import EditPatientConfirmModal from "../Patient/AddPatientConfirmModal";
import AddPatientConfirmModal from "../Patient/AddPatientConfirmModal";
import ErrorBanner from '../shared/ErrorBanner';
import { validateAddEditFields } from "../shared/Validate";

class EditPatient extends Component {
  constructor() {
    super();

    this.state = { showModal: false, willSubmit: false };
    this.updatePatient = this.updatePatient.bind(this);
  }

  onSubmit(event) {
    this.props.clearErrors();

    this.setState({
      patientDetails: {
        patientId: this.props.patientId,
        firstName: event.firstName,
        lastName: event.lastName,
        dateOfBirth: event.dateOfBirth,
        gender: event.gender,
        email: event.email,
        phone1: event.phone1,
        phone2: event.phone2 ? event.phone2 : null,
        preferredPhysician: event.preferredPhysician ? event.preferredPhysician : null,
        preferredHospital: event.preferredHospital ? event.preferredHospital : null,
        emergencyContactName: event.emergencyContactName ? event.emergencyContactName : null,
        emergencyContactRelation: event.emergencyContactRelation ? event.emergencyContactRelation : null,
        emergencyContactPhone: event.emergencyContactPhone ? event.phone2 : null
      },
      showModal: true
    });

  }

  updatePatient() {
    this.setState({ showModal: false, willSubmit: true });

    this.props.updatePatient(
      this.state.patientDetails,
      this.props.history.push
    );
  }

  componentWillMount() {
    window.scrollTo(0, 0);

    const editPatientData = this.props.patientInfo;
    this.props.getPatient(this.props.match.params.patientId);
  }

  render() {

    const { handleSubmit, noSuccess, errors } = this.props;
    return (
      <div className="row">
        {noSuccess ? <ErrorBanner errors={errors} /> : null}
        <h1>Edit Patient Information</h1>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <AddEditFields initialValues={this.props.initialValues} />
          <div className="col-sm-12">
            <Button className="pull-right " bsStyle="success" type="submit">
              Save Changes
            </Button>
            <Button
              className="pull-right margin-right"
              bsStyle="primary"
              componentClass={Link}
              to={`/Patient/${this.props.match.params.patientId}`} //Hard coded for now, need to change this
            >
              Patient Details
            </Button>
            <Button
              className="pull-right margin-right"
              bsStyle="danger"
              to="/MainMenu"
              componentClass={Link}
            >
              Main Menu
            </Button>
          </div>
        </form>
        {this.state.showModal && (
          <AddPatientConfirmModal
            showModal={this.state.showModal}
            closeModal={() => this.setState({ showModal: false })}
            savePatientInfo={this.updatePatient}
            patientDetails={this.state.patientDetails}
          />
        )}
        <Prompt
          when={
            (!this.state.willSubmit && !this.props.pristine) ||
            this.props.noSuccess == true
          }
          message={"Navigating away will clear all your changes. Continue ?"}
        />
      </div>
    );
  }
}

function validate(values) {
  return validateAddEditFields(values);
}

function mapStateToProps(state, ownProps) {
  var { patientDetails, noSuccess, errors } = state.patients;
  if (!patientDetails) return { noSuccess, errors };

  return {
    noSuccess,
    patientId: patientDetails.patientId,
    errors,
    initialValues: {
      firstName: patientDetails.firstName,
      lastName: patientDetails.lastName,
      dateOfBirth: patientDetails.dateOfBirthDateOnly,
      gender: patientDetails.gender,
      email: patientDetails.email,
      phone1: patientDetails.phone1,
      phone2: patientDetails.phone2,
      preferredPhysician: patientDetails.preferredPhysician,
      preferredHospital: patientDetails.preferredHospital,
      emergencyContactName: patientDetails.emergencyContactName,
      emergencyContactPhone: patientDetails.emergencyContactPhone,
      emergencyContactRelation: patientDetails.emergencyContactRelation
    }
  };
}

export default connect(
  mapStateToProps,
  { updatePatient, getPatient, clearErrors }
)(
  reduxForm({
    validate,
    form: "EditPatientForm"
  })(EditPatient)
);
