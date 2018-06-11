import React, { Component } from "react";
import LabeledText from "../shared/LabeledText";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm } from "redux-form";
import _ from "lodash";
import moment from "moment";

import { getPatient } from "../../actions/patient-actions";
import {
  searchOpenFDA,
  savePrescription
} from "../../actions/medicine-actions";
import AddEditMedicineFields from "../shared/AddEditMedicineFields";

//REFACTOR THIS MONSTROSITY :O
class AddMedicine extends Component {
  state = { allMedicineInfo: null };

  componentWillMount() {
    this.props.getPatient(this.props.match.params.patientId);
    //this.props.searchOpenFDA({ ndc: "0641-0376-21" });
  }

  handleAdditionalDetailChange(event) {
    this.setState({ selectedAdditionalDetail: event.target.value });
  }

  calculateAlerts(scheduledAlerts, originalNumberOfDoses) {
    let dosesPerDay = document.getElementById("dosesPerDay").value;
    let allAlerts = [];
    let day = 0;
    for (let i = 0; i < originalNumberOfDoses; i++) {
      if (i % dosesPerDay == 0) day++;
      let nextAlert = moment(scheduledAlerts[i % dosesPerDay])
        .add(day, "day")
        .toString();

      allAlerts.push(nextAlert);
    }

    return allAlerts;
  }

  onSubmit(values) {
    let postData = {
      ...values,
      scheduledAlerts: this.calculateAlerts(
        values.scheduledAlerts,
        values.originalNumberOfDoses
      ),
      ndc: this.props.ndc[0],
      patientId: this.props.patientId,
      brandName: this.props.brandName[0],
      genericName: this.props.genericName[0]
    };

    console.log("Values on submit", postData);
    this.props.savePrescription(postData);
  }

  render() {
    console.log("Render state in add", this.state);
    return (
      <div className="row">
        <h1>
          Add {this.props.brandName} to {this.props.fullName}
        </h1>
        <div className="row">
          <div className="col-sm-5">
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
              <AddEditMedicineFields />
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

const mapStateToProps = state => {
  if (state.patients.patientDetails && state.medicine.medicineDetails) {
    let { patientDetails } = state.patients;
    let { openfda } = state.medicine.medicineDetails;

    return {
      patientId: patientDetails.patientId,
      fullName: patientDetails.fullName,
      allMedicineInfo: state.medicine.medicineDetails,
      ndc: openfda.package_ndc,
      brandName: openfda.brand_name,
      genericName: openfda.generic_name,
      route: openfda.route,
      type: openfda.product_type
    };
  }
  return {};
};

function validate(values) {
  let errors = {};

  // let scheduledTimesArrayErrors = [];
  // scheduledTimesArrayErrors[0] = "errorTest";
  // scheduledTimesArrayErrors[1] = "error two";
  // errors.scheduledTimes = [];
  // errors.scheduledTimes[0] = "Invalidations";

  return errors;
}

export default reduxForm({
  form: "AddMedicine",
  validate
})(
  connect(
    mapStateToProps,
    { getPatient, searchOpenFDA, savePrescription }
  )(AddMedicine)
);
