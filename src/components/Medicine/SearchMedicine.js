import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Button, Thumbnail } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  searchOpenFDA,
  searchRxImage,
  selectOpenFdaResult,
  selectRxImageResult,
  clearMedicineData,
  searching,
  searchOpenFDARxcui
} from "../../actions/medicine-actions";
import SearchResults from "./SearchResults";

//TEMP
import axios from "axios";
import _ from "lodash";

class SearchMedicine extends Component {
  constructor(props) {
    super(props);

    props.clearMedicineData();

    this.handleOpenfdaResultClick = this.handleOpenfdaResultClick.bind(this);
    this.handleRximageResultClick = this.handleRximageResultClick.bind(this);
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

  handleOpenfdaResultClick(index) {
    let { patientId } = this.props.match.params;
    this.props.selectOpenFdaResult(this.props.openfdaSearchResults[index]);
    this.props.history.push(`/Patient/${patientId}/AddOpenFdaMedicine`);
  }

  handleRximageResultClick(index) {
    let { patientId } = this.props.match.params;
    this.props.selectRxImageResult(this.props.rximageSearchResults.nlmRxImages[index]);
    this.props.searchOpenFDARxcui(this.props.rximageSearchResults.nlmRxImages[index].rxcui);
    this.props.history.push(`/Patient/${patientId}/AddRxImageMedicine`);
  }

  handleSearchSubmit(event) {
    this.props.searching();
    let postData = {
      ndc: event.ndc ? event.ndc.trim() : null,
      name: event.name ? event.name.trim() : null
    };

    this.props.searchOpenFDA(postData);
    this.props.searchRxImage(postData);
  }

  render() {
    const { handleSubmit, isSearching } = this.props;

    return (
      <div>
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
                label="Medicine Name:"
                name="name"
              />

              <Button
                type="submit"
                bsStyle="primary"
                className="pull-right"
                disabled={isSearching}
              >
                Search
              </Button>
              <Button
                className="pull-right right-margin"
                bsStyle="success"
                componentClass={Link}
                disabled={isSearching}
                to={`/Patient/${this.props.match.params.patientId}`} //Hard coded for now, need to change this
              >
                Patient Details
              </Button>
              <Link
                to="/MainMenu"
                className="btn btn-danger right-margin pull-right"
                disabled={isSearching}
              >
                Main Menu
              </Link>
            </form>
          </div>
        </div>
        <SearchResults
          handleOpenfdaResultClick={this.handleOpenfdaResultClick}
          handleRximageResultClick={this.handleRximageResultClick}
          {...this.props}
        />
      </div>
    );
  }
}

function validate(values) {
  return {};
}

function mapStateToProps(state) {
  return {
    openfdaSearchResults: state.medicine.openfdaSearchResults,
    rximageSearchResults: state.medicine.rximageSearchResults,
    openfdaErrors: state.medicine.openfdaErrors,
    rximageErrors: state.medicine.rximageErrors,
    isSearching: state.medicine.isSearching
  };
}

export default reduxForm({
  validate,
  form: "AddMedicineSearch"
})(
  connect(
    mapStateToProps,
    {
      searchOpenFDA,
      clearMedicineData,
      searchRxImage,
      selectOpenFdaResult,
      selectRxImageResult,
      searching,
      searchOpenFDARxcui
    }
  )(SearchMedicine)
);
