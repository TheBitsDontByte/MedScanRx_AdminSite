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
    console.log("The values in event", event)
    this.setState({
      patientDetails: {
        patientId: this.props.patientId,
        firstName: event.firstName,
        lastName: event.lastName,
        dateOfBirth: event.dateOfBirth,
        gender: event.gender,
        contactInfoId: this.props.contactInfoId,
        email: event.email,
        phone1: event.phone1,
        phone2: event.phone2,
        preferredPhysician: event.preferredPhysician,
        preferredHospital: event.preferredHospital,
        emergencyContactName: event.emergencyContactName,
        emergencyContactRelation: event.emergencyContactRelation,
        emergencyContactPhone: event.emergencyContactPhone
      },
      showModal: true
    });

    console.log("PatientDetails", this.state.patientDetails)
    
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

    console.log("Props in edits render", this.props )

    const { handleSubmit, noSuccess } = this.props;
    return (
      <div className="row">
      {/* OMG FIX THIS HERE AND IN ADD PATIENTS< MAKE A REALL BANNER MODAL THINGY  */}
      {noSuccess ? <div>Herp derp im an error fix me im so dumb here</div> : null}
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
          when={(!this.state.willSubmit && !this.props.pristine) || this.props.noSuccess == true  }
          message={"Navigating away will clear all your changes. Continue ?"}
        />
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.firstName) errors.firstName = "First Name is required";
  if (values.firstName && values.firstName.length > 50) errors.firstName = "First Name must be less than 50 characters";

  if (!values.lastName) errors.lastName = "Last Name is required";
  if (values.lastName && values.lastName.length > 50 ) errors.lastName = "Last Name must be less than 50 characters"

  if (!values.dateOfBirth) errors.dateOfBirth = "Date of birth is required";

  if (!values.gender) errors.gender = "Please select a gender";

  if (!values.email) errors.email = "Email is required";

  if (!values.phone1) errors.phone1 = "Primary Phone Number is required";
  if (values.phone1 && values.phone1.length > 10) errors.phone1 = "Primary Phone Number must be 10 numeric characters";

  if (values.phone2 && values.phone2.length > 10) errors.phone2 = "Secondary Phone Number must be 10 numeric characters";

  if (values.preferredPhysician && values.preferredPhysician.length > 100) errors.preferredPhysician = "Preferred Physician must be less then 100 characters"

  if (values.preferredHospital && values.preferredHospital.length > 50) errors.preferredHospital = "Preferred Hospital must be less then 50 characters"
  
  if (values.emergencyContactName && values.emergencyContactName.length > 100) errors.emergencyContactName = "Emergency Contact Name must be less than 100 characters";

  if (values.emergencyContactRelation && values.emergencyContactRelation.length > 25) errors.emergencyContactRelation = "Emergency Contact Relation must be less than 25 characters";

  if (values.emergencyContactPhone && values.emergencyContactPhone.length > 10) errors.emergencyContactPhone = "Emergency Contact Phone must be 10 numeric characters";
  
  return errors;
}

function mapStateToProps(state, ownProps) {
  var { patientDetails, noSuccess } = state.patients;
  console.log("MapState for edit", patientDetails, noSuccess)
  if (!patientDetails) 
    return {noSuccess};

  return {
    noSuccess: noSuccess,
    patientId: patientDetails.patientId,
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
  { updatePatient, getPatient }
)(
  reduxForm({
    validate,
    form: "EditPatientForm"
  })(EditPatient)
);
