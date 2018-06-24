import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Button, Thumbnail } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  searchRxImage,
  selectOpenFdaResult,
  clearMedicineData
} from "../../actions/medicine-actions";

import _ from "lodash";

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
      console.log("RSR BOYO results", searchResults)
      return (
        <div>
          <h4 className="text-center"> Search Results</h4>
          {_.map(
            searchResults.nlmRxImages,
            ({ rxcui, ndc11, name, imageUrl }, index) => {
              return (
                <div
                  className="col-md-4"
                  onClick={() => this.handleSearchResultClick(index)}
                  key={ndc11}
                >
                  <strong>NDC:</strong>{ndc11}
                  <br />
                  <strong>Name:</strong> {name}
                  <br />
                  <strong>RxCUI:</strong> {rxcui} <br />
                  <Thumbnail src={imageUrl} responsive  />
                </div>
              );
            }
          )}{" "}
        </div>
      );
    }
  }

  handleSearchResultClick(index) {

    let { patientId } = this.props.match.params;
    this.props.selectOpenFdaResult(this.props.searchResults[index]);
    this.props.history.push(`/Patient/${patientId}/AddMedicine`);
  }

  handleSearchSubmit(event) {
    this.props.clearMedicineData();
    let postData = {
      ndc: event.ndc ? event.ndc.trim() : null,
      name: event.name ? event.name.trim() : null
    };
    this.props.searchRxImage(postData);
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
              label="Medicine NDC Number:"
              name="ndc"
            />
            <Field
              component={this.renderField}
              label="Medicine Name:"
              name="name"
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
  connect(
    mapStateToProps,
    { searchRxImage, clearMedicineData, selectOpenFdaResult }
  )(SearchMedicine)
);
