import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  searchOpenFDA,
  clearMedicineData
} from "../../actions/medicine-actions";

//TEMP
import axios from "axios";
import _ from "lodash";
import { NO_RESULTS } from "../../actions/patient-actions";

class SearchMedicine extends Component {
  constructor(props) {
    super(props);

    props.clearMedicineData();
  }

  renderField(field) {
    const { touched, error } = field.meta;
    const className = `form-group ${touched && error ? "has-error" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control "
          type="text"
          {...field.input}
          autoComplete="off"
        />
        <div className="text-danger">{touched ? error : ""}</div>
      </div>
    );
  }

  renderSearchResults() {
    console.log("RSR boyo", this.props);
    const { searchResults, noResults } = this.props;
    if (noResults)
      return (
        <h4 style={{ padding: 50 }} className="text-danger text-center">
          No Results Found
        </h4>
      );

    if (_.isEmpty(searchResults))
      return (
        <h4 style={{ padding: 50 }} className="text-center">
          Enter Search Criteria and Search ...
        </h4>
      );
    else if (searchResults) {
      return (
        <div>
          <h4 className="text-center"> Search Results</h4>
          {_.map(
            searchResults,
            ({
              openfda: {
                package_ndc,
                brand_name,
                generic_name,
                manufacturer_name
              }
            }) => {
              return (
                <li
                  className="list-group-item"
                  onClick={() => this.handleSearchResultClick()}
                  key={package_ndc}
                >
                  <strong>NDC:</strong>{" "}
                  {_.map(package_ndc, ndc => {
                    return ndc + ", ";
                  })}
                  <br />
                  <strong>Brand Name:</strong> {brand_name}
                  <br />
                  <strong>Generic Name:</strong> {generic_name} <br />
                  <strong>Manufacturer: </strong> {manufacturer_name}
                </li>
              );
            }
          )}{" "}
        </div>
      );
    }
  }

  handleSearchResultClick() {
    let { patientId } = this.props.match.params;
    this.props.history.push(`/Patient/${patientId}/AddMedicine`);
  }

  handleSearchSubmit(event) {
    let postData = {
      ndc: event.ndc,
      brandName: event.brandName,
      genericName: event.genericName
    };
    this.props.searchOpenFDA(postData);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="row">
        <h1>Search Medicine</h1>
        <div className="col-sm-4">
          <form
            className="form-group"
            onSubmit={handleSubmit(this.handleSearchSubmit.bind(this))}
          >
            <Field
              component={this.renderField}
              label="NDC Number:"
              name="ndc"
            />
            <Field
              component={this.renderField}
              label="Brand Name:"
              name="brandName"
            />
            <Field
              component={this.renderField}
              label="Generic Name: "
              name="genericName"
            />
            <Button type="submit" bsStyle="primary" className="pull-right">
              Search
            </Button>
            <Button
              className="pull-right right-margin"
              bsStyle="success"
              componentClass={Link}
              to={`/Patient/${this.props.match.params.patientId}`} //Hard coded for now, need to change this
            >
              Patient Details
            </Button>
            <Link
              to="/MainMenu"
              className="btn btn-danger right-margin pull-right"
            >
              Main Menu
            </Link>
          </form>
        </div>
        <div className="row">
          <div className="col-md-7">{this.renderSearchResults()}</div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  return {};
}

function mapStateToProps(state) {
  return {
    searchResults: state.medicine.searchResults,
    noResults: state.medicine.noResults
  };
}

export default reduxForm({
  validate,
  form: "AddMedicineSearch"
})(
  connect(mapStateToProps, { searchOpenFDA, clearMedicineData })(SearchMedicine)
);
