import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link, Prompt } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { savePatient } from "../../actions/patient-actions";

import AddPatientConfirmModal from "./AddPatientConfirmModal";
import AddEditFields from "../shared/AddEditFields";

class AddPatient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      patientInfo: null,
      willSubmit: false
    };

    this.closeModal = this.closeModal.bind(this);
    this.savePatient = this.savePatient.bind(this);
  }

  closeModal() {
    this.setState({
      showModal: false
    });
  }

  savePatient() {
    this.setState({
      showModal: false,
      willSubmit: true
    });

    this.props.savePatient(this.state.patientDetails, this.props.history.push);
  }

  onSubmit(event) {
    const patientDetails = {
      firstName: event.firstName,
      lastName: event.lastName,
      dateOfBirth: event.dateOfBirth,
      gender: event.gender,
      email: event.email,
      phone1: event.phone1,
      phone2: event.phone2,
      preferredPhysician: event.preferredPhysician,
      preferredHospital: event.preferredHospital,
      emergencyContactName: event.emergencyContactName,
      emergencyContactRelation: event.emergencyContactRelation,
      emergencyContactPhone: event.emergencyContactPhone
    };

    this.setState({
      showModal: true,
      patientDetails
    });
  }

  render() {

    console.log("Props in adds render, and state", this.props, this.state )


    const { handleSubmit, noSuccess } = this.props;
    return (
      <div className="row">
      {/* FIX THIS INTO AN ACTUAL ERROR BANNER OR SOMETHING -- DONT COPY CPS, WHAT DO YOU WANT ?!?!?!?! =========================================================== */}
      {noSuccess ? <div>ERROR HAPPENED COULDNT SAVE TRY AGAIN</div> : null} 
        <h1>Add A Patient</h1>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <AddEditFields />
          <div className="col-lg-12 col-sm-12">
            <button className="btn btn-success pull-right" type="submit">
              Add Patient
            </button>
            <Link
              to="/MainMenu"
              className="btn btn-danger  pull-right right-margin"
            >
              Main Menu
            </Link>
          </div>
        </form>
        {this.state.patientDetails && (
          <AddPatientConfirmModal
            showModal={this.state.showModal}
            closeModal={this.closeModal}
            savePatientInfo={this.savePatient}
            patientDetails={this.state.patientDetails}
          />
        )}

        <Prompt
          when={(!this.state.willSubmit && !this.props.pristine) || this.props.noSuccess == true  }
          message={"Navigating back will clear all your data. Continue ?"}
        />
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.firstName) errors.firstName = "First Name is required";

  if (!values.lastName) errors.lastName = "Last Name is required";

  if (!values.gender) errors.gender = "Please select a gender";

  return errors;
}

function mapStateToProps(state) {
  return {
    patientDetails: state.patients.patientDetails,
    noSuccess: state.patients.noSuccess
  };
}

export default reduxForm({
  validate,
  form: "AddPatientForm"
})(connect(mapStateToProps, { savePatient })(AddPatient));
