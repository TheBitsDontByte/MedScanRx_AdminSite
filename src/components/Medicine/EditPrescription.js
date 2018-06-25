import React, { Component } from "react";
import LabeledText from "../shared/LabeledText";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm } from "redux-form";
import _ from "lodash";
import moment from "moment";

import AddEditMedicineFields from "../shared/AddEditMedicineFields";
import {
  getPrescriptionDetail,
  searchOpenFDA,
} from "../../actions/medicine-actions";
import { getPatient } from "../../actions/patient-actions";

class EditPrescription extends Component {
  constructor() {
    super();

    this.state = { showCurrentAlerts: true };
  }

  componentWillMount() {
    this.props.searchOpenFDA(this.props.location.state, null);
    this.props.getPrescriptionDetail(this.props.match.params.prescriptionId);
    this.props.getPatient(this.props.match.params.patientId);
  }

  onSubmit(values) {
    console.log("values before", values, this.state, this.props);
    let postData = {
      ...values,
      prescriptionId: this.props.prescriptionId,
      patientId: this.props.patientId,
      brandName: this.props.brandName[0],
      genericName: this.props.genericName[0],
      currentNumberOfDoses: values.originalNumberOfDoses,
      currentNumberOfRefills: values.originalNumberOfRefills
    };
    if (this.state.showCurrentAlerts)
      postData.scheduledAlerts = this.props.scheduledAlerts;
    else
      postData.scheduledAlerts = this.calculateAlerts(
        values.scheduledAlerts,
        this.props.currentNuberOfDoses,
        values.scheduledAlerts.length
      );

    console.log("after", postData);
    this.props.updatePrescription(postData, this.props.history.push);
  }

  onDeleteClick() {
    this.props.deletePrescription(this.props.prescriptionId, this.props.patientId, this.props.history.pop);
  }

  calculateAlerts(scheduledAlerts, originalNumberOfDoses, dosesPerDay) {
    let allAlerts = [];
    let day = 0;
    for (let i = 0; i < originalNumberOfDoses; i++) {
      if (i % dosesPerDay == 0) day++;
      let nextAlert = moment(scheduledAlerts[i % dosesPerDay])
        .add(day, "day")
        .format("YYYYMMDD HH:mm:ss");

      allAlerts.push(nextAlert);
    }

    return allAlerts;
  }

  render() {
    if (!this.props.patientId && !this.props.ndc)
      return <div>Loading... (fix me)</div>;
    return (
      <div className="row">
        <h1>
          Add {this.props.brandName} to {this.props.fullName}
        </h1>
        <div className="row">
          <div className="col-sm-5">
            <Button
              onClick={this.onDeleteClick.bind(this)}
              bsStyle="danger"
              bsSize="large"
            >
              Delete This Prescription
            </Button>
            <h3>Open FDA's Medicine Information</h3>
            <div className="row">
              <div className="col-sm-offset-1">
                <LabeledText
                  label="NDC:"
                  text={_.map(this.props.ndc, ndc => {
                    return ndc + ", ";
                  })}
                />
                <LabeledText
                  label="Generic Name: "
                  text={this.props.genericName}
                />
                <LabeledText label="Brand Name: " text={this.props.brandName} />
                <LabeledText label="Route: " text={this.props.route} />
                <LabeledText label="Type: " text={this.props.type} />
              </div>
            </div>
            <div>
              <h3>Open FDA's Medicine Details</h3>
              <div className="row">
                <div className="col-sm-offset-1 col-sm-11">
                  {this.props.allMedicineInfo ? (
                    <select
                      className="form-control"
                      onChange={this.handleAdditionalDetailChange.bind(this)}
                    >
                      <option hidden value="">
                        Select a category....
                      </option>
                      {_.map(this.props.allMedicineInfo, (value, key) => {
                        if (key != "openfda")
                          return (
                            <option key={key} value={key}>
                              {key}
                            </option>
                          );
                      })}
                    </select>
                  ) : null}
                </div>
              </div>
              {this.props.allMedicineInfo && (
                <div className="row" style={{ marginTop: 10 }}>
                  <div className="col-sm-offset-1 col-sm-11">
                    <p style={{ padding: 10 }}>
                      {
                        this.props.allMedicineInfo[
                          this.state.selectedAdditionalDetail
                        ]
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-sm-7">
            <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
              <AddEditMedicineFields
                ndc={this.props.ndc}
                scheduledAlerts={this.props.scheduledAlerts}
                allowEdits={true}
                showCurrentAlerts={this.state.showCurrentAlerts}
                onToggleAlert={() =>
                  this.setState({
                    showCurrentAlerts: !this.state.showCurrentAlerts
                  })
                }
              />
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
  if (
    state.patients.patientDetails &&
    state.medicine.searchResults &&
    state.medicine.prescriptionDetail
  ) {
    let { patientDetails } = state.patients;
    let { prescriptionDetail } = state.medicine;
    let { openfda } = state.medicine.searchResults[0];
    console.log("MSTP prescriptionDetail", prescriptionDetail);
    return {
      scheduledAlerts: prescriptionDetail.scheduledAlerts,
      currentNuberOfDoses: prescriptionDetail.currentNumberOfDoses,
      patientId: patientDetails.patientId,
      prescriptionId: prescriptionDetail.prescriptionId,
      fullName: patientDetails.fullName,
      allMedicineInfo: state.medicine.medicineDetails,
      ndc: openfda.package_ndc,
      brandName: openfda.brand_name,
      genericName: openfda.generic_name,
      route: openfda.route,
      type: openfda.product_type,
      initialValues: {
        originalNumberOfDoses: prescriptionDetail.currentNumberOfDoses,
        originalNumberOfRefills: prescriptionDetail.currentNumberOfRefills,
        dosage: prescriptionDetail.dosage,
        shape: prescriptionDetail.shape,
        identifiers: prescriptionDetail.identifiers,
        ndc: prescriptionDetail.ndc,
        color: prescriptionDetail.color,
        barcode: prescriptionDetail.barcode,
        warnings: prescriptionDetail.warnings,
        doctorNotes: prescriptionDetail.doctorNotes
      }
    };
  }
  return {};
};

export default connect(
  mapStateToProps,
  { getPrescriptionDetail, searchOpenFDA, getPatient }
)(reduxForm({ form: "EditMedicine" })(EditPrescription));
