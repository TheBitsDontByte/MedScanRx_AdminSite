import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link, Prompt } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import _ from "lodash";

import { getPatient } from "../../actions/patient-actions";
import {
  savePrescription,
  searchRxImage
} from "../../actions/medicine-actions";
import AddEditMedicineFields from "../shared/AddEditMedicineFields";
import OpenFdaMedicineInfo from "../shared/OpenFdaMedicineInfo";
import MedicineConfirmModal from "./MedicineConfirmModal";
import ErrorBanner from "../shared/ErrorBanner";

import { calculateAlerts } from "./AddMedicineHelperFunctions";

class AddMedicine extends Component {
  state = { allMedicineInfo: null, showModal: false };

  componentWillMount() {
    window.scrollTo(0, 0);

    this.props.getPatient(this.props.match.params.patientId);
  }

  componentWillReceiveProps() {
    if (this.props.noSuccess && this.props.errors) {
      window.scrollTo(0, 0);
    }
  }

  handleAdditionalDetailChange(event) {
    this.setState({ selectedAdditionalDetail: event.target.value });
  }

  onSubmit(values) {
    let prescriptionDetails = {
      ...values,
      scheduledAlerts: calculateAlerts(values),
      patientId: this.props.patientId,
      rxcui: this.props.rxcui[0]
    };

    this.setState({ prescriptionDetails, showModal: true });
  }

  savePrescription() {
    this.setState({ showModal: false });
    this.props.savePrescription(this.state.prescriptionDetails, this.props.history.push);
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    if (!this.props.patientId)
      return (
        <div className="row text-center">
          <h2>Loading ...</h2>
        </div>
      );

    if (!this.props.ndc) {
      this.props.history.push("/RedirectPage");
      return <div />;
    }

    return (
      <div className="row">
        <h1>
          Add {this.props.medicineDetails.openfda.brand_name} to{" "}
          {this.props.fullName}
        </h1>
        {this.props.noSuccess && <ErrorBanner errors={this.props.errors} />}
        <div className="row">
          <div className="col-sm-5">
            <h3>Open FDA's Medicine Information</h3>
            <OpenFdaMedicineInfo
              openFdaMedicineInfo={this.props.medicineDetails}
            />
          </div>
          <div className="col-sm-7">
            <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
              <AddEditMedicineFields ndc={this.props.ndc} />
              <div className="row" style={{ paddingTop: 20 }}>
                <Button type="submit" bsStyle="success" className="pull-right">
                  Save
                </Button>
                <Button
                  className="pull-right right-margin"
                  bsStyle="primary"
                  componentClass={Link}
                  to={`/Patient/${this.props.match.params.patientId}`}
                >
                  Patient Details
                </Button>
                <Button
                  to="/MainMenu"
                  bsStyle="danger"
                  className="pull-right margin-right"
                  componentClass={Link}
                >
                  Main Menu
                </Button>
              </div>
            </form>
          </div>
        </div>
        {this.state.prescriptionDetails && (
          <MedicineConfirmModal
            showModal={this.state.showModal}
            closeModal={this.closeModal.bind(this)}
            savePrescription={this.savePrescription.bind(this)}
            prescriptionDetails={this.state.prescriptionDetails}
          />
        )}
        <Prompt
          when={
            (this.props.anyTouched && !this.props.submitSucceeded) ||
            this.props.noSuccess == true
          }
          message={"Navigating away will clear all your data. Continue ?"}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (state.patients.patientDetails && state.medicine.medicineDetails) {
    let { patientDetails } = state.patients;
    let { openfda } = state.medicine.medicineDetails;

    return {
      medicineDetails: state.medicine.medicineDetails,
      patientId: patientDetails.patientId,
      fullName: patientDetails.fullName,
      allMedicineInfo: state.medicine.medicineDetails,
      ndc: openfda.package_ndc,
      rxcui: openfda.rxcui,
      route: openfda.route,
      type: openfda.product_type,
      noSuccess: state.medicine.noSuccess,
      errors: state.medicine.errors
    };
  } else if (state.patients.patientDetails) {
    return {
      patientId: state.patients.patientDetails.patientId,
      fullName: state.patients.patientDetails.fullName
    };
  }
  return {};
};

function validate(values) {
  let errors = {};

  if (!values.ndc) errors.ndc = "Please select the correct NDC";

  if (!values.prescriptionName)
    errors.prescriptionName = "Prescription Name is required";

  if (!values.originalNumberOfDoses)
    errors.originalNumberOfDoses = "Number of Doses is required";

  if (!values.originalNumberOfRefills)
    errors.originalNumberOfRefills = "Number of Refills is required";

  if (!values.dosage) errors.dosage = "Dosage is required";

  if (!values.shape) errors.shape = "Shape is required";

  if (!values.identifiers)
    errors.identifiers = "Unique Identifiers is required";

  if (!values.color) errors.color = "Color is required";

  if (!values.startDay) errors.startDay = "A starting day is required";

  if (values.scheduledAlerts) {
    for (let i = 0; i < values.scheduledAlerts.length; i++) {
      if (_.isEmpty(values.scheduledAlerts[i])) {
        errors.scheduledAlerts = {
          _error: "Times must be selected for all alerts"
        };
      }
    }
  }

  if (
    values.scheduledAlerts &&
    !errors.scheduledAlerts &&
    _.uniq(values.scheduledAlerts).length != values.scheduledAlerts.length
  )
    errors.scheduledAlerts = {
      _error: "Duplicate alert times are not allowed"
    };

  return errors;
}

export default reduxForm({
  form: "AddMedicine",
  validate
})(
  connect(
    mapStateToProps,
    { getPatient, savePrescription, searchRxImage }
  )(AddMedicine)
);
