import React, { Component } from "react";
import LabeledText from "../shared/LabeledText";
import { Button, Thumbnail } from "react-bootstrap";
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

//REFACTOR THIS MONSTROSITY :O
class AddMedicine extends Component {
  state = {
    allMedicineInfo: null,
    openFdaFilterTerm: "",
    showFilteredOpenFdaResults: false,
    showSelectedOpenFdaResult: false,
    selectedOpenFdaResultError: null,
    filteredResults: null
  };

  componentWillMount() {
    window.scrollTo(0, 0);

    this.props.getPatient(this.props.match.params.patientId);
  }

  handleAdditionalDetailChange(event) {
    this.setState({ selectedAdditionalDetail: event.target.value });
  }

  calculateAlertsStartingToday({
    scheduledAlerts,
    originalNumberOfDoses,
    dosesPerDay
  }) {
    console.log("Start today", scheduledAlerts, originalNumberOfDoses, dosesPerDay)
    let allAlerts = [];
    let startingIndex = 0;
    for (let i = 0; i < scheduledAlerts.length; i++) {
      if (moment(scheduledAlerts[i]).isAfter(moment())) {
        startingIndex = i;
        break;
      }
    }

    let daysToAdd = 0;

    for (
      let k = startingIndex;
      k < +originalNumberOfDoses + +startingIndex;
      k++
    ) {
      if (k !== 0 && k % dosesPerDay == 0) daysToAdd++;
      let nextAlert = moment(scheduledAlerts[k % dosesPerDay])
        .add(daysToAdd, "day")
        .format("YYYYMMDD HH:mm:ss");

      allAlerts.push(nextAlert);
    }

    return allAlerts;
  }

  calculateAlertsStartingTomorrow({
    scheduledAlerts,
    originalNumberOfDoses,
    dosesPerDay
  }) {
    let allAlerts = [];
    let daysToAdd = 1;

    for (let i = 0; i < originalNumberOfDoses; i++) {
      if (i !== 0 && i % dosesPerDay == 0) daysToAdd++;
      let nextAlert = moment(scheduledAlerts[i % dosesPerDay])
        .add(daysToAdd, "day")
        .format("YYYYMMDD HH:mm:ss");

      allAlerts.push(nextAlert);
    }

    return allAlerts;
  }

  calculateAlerts(values) {
    return values.startDay === "today"
      ? this.calculateAlertsStartingToday(values)
      : this.calculateAlertsStartingTomorrow(values);
  }

  onSubmit(values) {
    if (!this.state.selectedOpenFdaResult) {
      this.setState({ selectedOpenFdaResultError: true });
      window.scrollTo(0, 0);
      return;
    }
    this.setState({ selectedOpenFdaResultError: null });

    let postData = {
      ...values,
      scheduledAlerts: this.calculateAlerts(values),
      patientId: this.props.patientId,
      brandName: this.state.selectedOpenFdaResult.openfda.brand_name[0],
      genericName: this.state.selectedOpenFdaResult.openfda.generic_name[0],
      rxcui: this.props.rxcui,
      imageUrl: this.props.imageUrl,
      rximageMedicineName: this.props.medicineName
    };

    console.log("Values on submit", postData);
    //this.props.savePrescription(postData, this.props.history.push);
  }

  handleFilterTermChange(event) {
    this.setState({ openFdaFilterTerm: event.target.value });
  }

  onOpenFdaFilter() {
    let filteredResults = _.filter(
      this.props.openFdaRxcuiSearchResults,
      result => {
        for (let i = 0; i < result.openfda.package_ndc.length; i++)
          if (
            result.openfda.package_ndc[i].includes(this.state.openFdaFilterTerm)
          )
            return true;
      }
    );
    this.setState({
      showSelectedOpenFdaResult: false,
      selectedOpenFdaResult: null,
      showFilteredOpenFdaResults: true,
      filteredResults
    });
  }
  S;

  handleFilteredOpenfdaResultClick(index) {
    this.setState({
      showSelectedOpenFdaResult: true,
      selectedOpenFdaResult: this.state.filteredResults[index],
      showFilteredOpenFdaResults: false,
      selectedOpenFdaResultError: null
    });
  }

  render() {
    if (!this.props.patientId)
      return (
        <div className="row text-center">
          <h2>Loading ...</h2>
        </div>
      );

    if (!this.props.ndc) this.props.history.push("RedirectPage");

    return (
      <div className="row">
        <h1>
          Add {this.props.medicineName} to {this.props.fullName}
        </h1>
        <div className="row">
          <div className="form-inline col-sm-5">
            <h3>RxImage's Medicine Information</h3>
            <div className="row">
              <div className="col-sm-offset-1 col-sm-10">
                <LabeledText label="Name: " text={this.props.medicineName} />
                <LabeledText label="NDC: " text={this.props.ndc} />
                <LabeledText label="Rxcui: " text={this.props.rxcui} />
                <Thumbnail src={this.props.imageUrl} responsive={true} />
              </div>
            </div>
            <h3>Open FDA's Medicine Information</h3>
            {this.state.selectedOpenFdaResultError ? (
              <h5 className="text-danger text-center">
                Filter and select the correct OpenFda Medicine
              </h5>
            ) : null}
            <div className="row">
              <div className="text-center">
                <input
                  className="form-control margin-right"
                  placeholder="Filter by partial NDC"
                  onChange={this.handleFilterTermChange.bind(this)}
                />
                <button
                  className="btn btn-primary"
                  onClick={this.onOpenFdaFilter.bind(this)}
                >
                  Filter
                </button>
              </div>
              {this.state.showFilteredOpenFdaResults &&
                _.map(
                  this.state.filteredResults,
                  (
                    {
                      openfda: {
                        package_ndc,
                        brand_name,
                      }
                    },
                    index
                  ) => {
                    return (
                      <div className="col-md-offset-1 col-md-10 margin-top">
                        <li
                          className="list-group-item"
                          onClick={() =>
                            this.handleFilteredOpenfdaResultClick(index)
                          }
                          key={package_ndc}
                        >
                          <strong>NDC:</strong>{" "}
                          {_.map(package_ndc, ndc => `${ndc}, `)}
                          <br />
                          <strong>Brand Name:</strong> {brand_name}
                          <br />
                        </li>
                      </div>
                    );
                  }
                )}
              {this.state.showSelectedOpenFdaResult && (
                <div className="margin-top">
                  <OpenFdaMedicineInfo
                    openFdaMedicineInfo={this.state.selectedOpenFdaResult}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="col-sm-7">
            <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
              <AddEditMedicineFields ndc={this.props.ndc} />
              <div className="row" style={{ paddingTop: 20 }}>
                <Button type="submit" bsStyle="success" className="pull-right">
                  Save
                </Button>
                <Button
                  className="pull-right margin-right"
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
    let medicineDetails = state.medicine.medicineDetails;

    return {
      patientId: patientDetails.patientId,
      fullName: patientDetails.fullName,
      allMedicineInfo: state.medicine.medicineDetails,
      ndc: medicineDetails.ndc11,
      rxcui: medicineDetails.rxcui,
      medicineName: medicineDetails.name,
      imageUrl: medicineDetails.imageUrl,
      openFdaRxcuiSearchResults: state.medicine.openfdaSearchResults
    };
  } else if (state.patients.patientDetails) {
    let { patientDetails } = state.patients;

    return {
      patientId: patientDetails.patientId,
      fullName: patientDetails.fullName
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
    { getPatient, savePrescription, searchRxImage }
  )(AddMedicine)
);
