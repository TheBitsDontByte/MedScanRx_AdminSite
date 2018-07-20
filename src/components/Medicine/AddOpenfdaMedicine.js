import React, { Component } from "react";
import LabeledText from "../shared/LabeledText";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import _ from "lodash";
import moment from "moment";

import { getPatient } from "../../actions/patient-actions";
import {
  savePrescription,
  searchRxImage
} from "../../actions/medicine-actions";
import AddEditMedicineFields from "../shared/AddEditMedicineFields";
import OpenFdaMedicineInfo from "../shared/OpenFdaMedicineInfo";
import { calculateAlerts } from "./AddMedicineHelperFunctions";

class AddMedicine extends Component {
  state = { allMedicineInfo: null };

  componentWillMount() {
    this.props.getPatient(this.props.match.params.patientId);
  }

  handleAdditionalDetailChange(event) {
    this.setState({ selectedAdditionalDetail: event.target.value });
  }

  onSubmit(values) {
    let postData = {
      ...values,
      scheduledAlerts: calculateAlerts(values),
      patientId: this.props.patientId,
      brandName: this.props.brandName[0],
      genericName: this.props.genericName[0],
      rxcui: this.props.rxcui[0]
    };

    console.log("Values on submit", postData);
    this.props.savePrescription(postData, this.props.history.push);
  }

  render() {
    if (!this.props.patientId)
      return (
        <div className="row text-center">
          <h2>Loading ...</h2>
        </div>
      );

    //This is an anti-pattern, think about how to refactor TODO
    if (!this.props.ndc) {
      this.props.history.push("/RedirectPage");
      return <div />;
    }
    console.log("Props in openfda", this.props);

    return (
      <div className="row">
        <h1>
          Add {this.props.brandName} to {this.props.fullName}
        </h1>
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
      brandName: openfda.brand_name,
      genericName: openfda.generic_name,
      route: openfda.route,
      type: openfda.product_type
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
