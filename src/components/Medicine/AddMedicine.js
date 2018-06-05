import React, { Component } from "react";
import LabeledText from "../shared/LabeledText";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm } from "redux-form";
import _ from "lodash";

import { getPatient } from "../../actions/patient-actions";
import { searchOpenFDA } from "../../actions/medicine-actions";
import AddEditMedicineFields from "../shared/AddEditMedicineFields";

//REFACTOR THIS MONSTROSITY :O
class AddMedicine extends Component {
  state = { allMedicineInfo: null };

  componentWillMount() {
    this.props.getPatient(this.props.match.params.patientId);
    this.props.searchOpenFDA({ ndc: "0641-0376-21" });
  }

  handleAdditionalDetailChange(event) {
    this.setState({ selectedAdditionalDetail: event.target.value });
  }

  render() {
    console.log("Render state", this.state);
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
                          //ignore, cause displayed
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
                <div
                  className="row"
                  style={{  marginTop: 10 }}
                >
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
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (state.patients.patientDetails && state.medicine[0]) {
    let { Patient } = state.patients.patientDetails;
    let { openfda } = state.medicine[0];

    return {
      patientId: Patient.patientId,
      fullName: Patient.FirstName + " " + Patient.LastName,
      allMedicineInfo: state.medicine[0],
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
  console.log("Validate values", values);

  // let scheduledTimesArrayErrors = [];
  // scheduledTimesArrayErrors[0] = "errorTest";
  // scheduledTimesArrayErrors[1] = "error two";
  errors.scheduledTimes = [];
  errors.scheduledTimes[0] = "Invalidations";

  return errors;
}

export default reduxForm({
  form: "AddMedicine",
  validate
})(connect(mapStateToProps, { getPatient, searchOpenFDA })(AddMedicine));
