import React, { Component } from "react";
import LabeledText from "../shared/LabeledText";
import { Button, Thumbnail } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm } from "redux-form";
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
    filteredResults: null
  };

  componentWillMount() {
    window.scrollTo(0, 0);

    this.props.getPatient(this.props.match.params.patientId);
  }

  handleAdditionalDetailChange(event) {
    this.setState({ selectedAdditionalDetail: event.target.value });
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

  onSubmit(values) {
    console.log("values and state", this.state.selectedOpenFdaResult)
    let postData = {
      ...values,
      scheduledAlerts: this.calculateAlerts(
        values.scheduledAlerts,
        values.originalNumberOfDoses,
        values.dosesPerDay
      ),
      patientId: this.props.patientId,
      brandName: this.state.selectedOpenFdaResult.openfda.brand_name[0],
      genericName: this.state.selectedOpenFdaResult.openfda.generic_name[0]
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
        return (
          result.openfda.brand_name[0]
            .toString()
            .toUpperCase()
            .includes(this.state.openFdaFilterTerm.toUpperCase()) ||
          result.openfda.manufacturer_name[0]
            .toString()
            .toUpperCase()
            .includes(this.state.openFdaFilterTerm.toUpperCase())
        );
      }
    );

    this.setState({
      showSelectedOpenFdaResult: false,
      selectedOpenFdaResult: null,
      showFilteredOpenFdaResults: true,
      filteredResults
    });
    //What to do with the filtered shit now ? How to set it on timeout ?
    console.log("filtered results", filteredResults);
  }

  handleFilteredOpenfdaResultClick(index) {
    console.log("filterd index", index);
    this.setState({
      showSelectedOpenFdaResult: true,
      selectedOpenFdaResult: this.state.filteredResults[index],
      showFilteredOpenFdaResults: false
    });
  }

  render() {
    console.log("Render props in addrximage", this.props);

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
            <h3>Open FDA's Medicine Information</h3>
            <div className="row">
              <div className="text-center">
                <input
                  className="form-control margin-right"
                  placeholder="Type Manufacturer or Brand Name to filter"
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
                        generic_name,
                        manufacturer_name
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
            <h3>RxImage's Medicine Information</h3>
            <div className="row">
              <div className="col-sm-offset-1">
                <LabeledText label="Name: " text={this.props.medicineName} />
                <LabeledText label="NDC: " text={this.props.ndc} />
                <LabeledText label="Rxcui: " text={this.props.rxcui} />
                <Thumbnail src={this.props.imageUrl} responsive={true} />
              </div>
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
  console.log("State in add rximage", state, ownProps);
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
