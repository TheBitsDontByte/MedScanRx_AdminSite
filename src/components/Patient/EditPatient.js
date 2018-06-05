import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link, Prompt } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import { updatePatient, getPatient } from "../../actions/patient-actions";

import AddEditFields from "../shared/AddEditFields";
import EditPatientConfirmModal from "../Patient/AddPatientConfirmModal";
import AddPatientConfirmModal from "../Patient/AddPatientConfirmModal";

class EditPatient extends Component {
  constructor() {
    super();

    this.state = { showModal: false, willSubmit: false };
    this.updatePatient = this.updatePatient.bind(this);
  }

  onSubmit(event) {
    this.setState({
      patientDetails: {
        patient: {
          patientId: this.props.patientId,
          firstName: event.firstName,
          lastName: event.lastName,
          patientId: this.props.match.params.patientId,
          dateOfBirth: event.dateOfBirth,
          gender: event.gender,
          contactInfoId: this.props.contactInfoId
        },
        contactInfo: {
          email: event.email,
          phone1: event.phone1,
          phone2: event.phone2,
          emergencyName: event.emergencyName,
          emergencyRelationship: event.emergencyRelationship,
          emergencyPhone: event.emergencyPhone
        }
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
    const { handleSubmit } = this.props;
    return (
      <div className="row">
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
            patientInfo={this.state.patientDetails}
          />
        )}
        <Prompt
          when={!this.state.willSubmit && !this.props.pristine}
          message={"Navigating away will clear all your changes. Continue ?"}
        />
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.firstName) errors.firstName = "First Name is required";

  if (!values.lastName) errors.lastName = "Last Name is required";
  //etc etc

  return errors;
}

function mapStateToProps(state) {
  if (!state.patients.patientDetails) return {};

  let { Patient, ContactInfo } = state.patients.patientDetails;
  return {
    contactInfoId: Patient.ContactInfoId,
    patientId: Patient.PatientId,
    initialValues: {
      firstName: Patient.FirstName,
      lastName: Patient.LastName,
      dateOfBirth: Patient.DateOfBirth,
      gender: Patient.Gender,
      email: ContactInfo.Email,
      phone1: ContactInfo.Phone1,
      phone2: ContactInfo.Phone2,
      primaryPhysician: ContactInfo.PrimaryPhysician,
      preferredHopsital: ContactInfo.PreferredHospital,
      emergencyName: ContactInfo.EmergencyName,
      emergencyPhone: ContactInfo.EmergencyPhone,
      emergencyRelationship: ContactInfo.EmergencyRelationship
    }
  };
}

export default connect(mapStateToProps, { updatePatient, getPatient })(
  reduxForm({
    validate,
    form: "EditPatientForm"
  })(EditPatient)
);
