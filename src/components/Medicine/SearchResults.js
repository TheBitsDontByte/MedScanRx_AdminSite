import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Button, Thumbnail } from "react-bootstrap";
import { Link } from "react-router-dom";

import _ from "lodash";

class SearchResults extends Component {
  renderRxImageSearchResults() {
    const { rximageSearchResults, rximageErrors } = this.props;
    if (rximageErrors)
      return (
        <div>
          <h2 className="text-center"> RxImage Search Results</h2>
          <h4 style={{ padding: 50 }} className="text-danger text-center">
            {rximageErrors}
          </h4>
        </div>
      );
    else if (rximageSearchResults) {
      return (
        <div>
          <h2 className="text-center"> RxImage Search Results</h2>
          {_.map(
            rximageSearchResults.nlmRxImages,
            ({ rxcui, ndc11, name, imageUrl, labeler }, index) => {
              return (
                <div
                  className="col-md-6 rximage-border"
                  onClick={() => this.props.handleRximageResultClick(index)}
                  key={ndc11}
                >
                  <div style={{ height: "120px" }}>
                    <strong>NDC:</strong>
                    {ndc11}
                    <br />
                    <strong>Name:</strong> {name}
                    <br />
                    <strong>RxCUI:</strong> {rxcui} <br />
                  </div>
                  <Thumbnail src={imageUrl} />
                </div>
              );
            }
          )}{" "}
        </div>
      );
    }
  }
  renderOpenFdaSearchResults() {
    const { openfdaSearchResults, openfdaErrors } = this.props;
    if (openfdaErrors)
      return (
        <div>
          <h2 className="text-center"> OpenFda Search Results</h2>
          <h4 style={{ padding: 50 }} className="text-danger text-center">
            {openfdaErrors}
          </h4>
        </div>
      );
    else if (openfdaSearchResults) {
      return (
        <div>
          <h2 className="text-center"> OpenFda Search Results</h2>
          {_.map(
            openfdaSearchResults,
            (
              {
                openfda: {
                  rxcui,
                  package_ndc,
                  brand_name,
                  generic_name,
                  manufacturer_name
                }
              },
              index
            ) => {
              return (
                <li
                  className="list-group-item"
                  onClick={() => this.props.handleOpenfdaResultClick(index)}
                  key={package_ndc}
                >
                  <strong>NDC:</strong>{" "}
                  {_.map(package_ndc, ndc => {
                    return ndc + ", ";
                  })}
                  <br />
                  <strong>NDC:</strong>{" "}
                  {_.map(rxcui, cui => {
                    return cui + ", ";
                  })}
                  <br />
                  <strong>Brand Name:</strong> {brand_name}
                  <br />
                  <strong>Generic Name:</strong> {generic_name} <br />
                  <strong>Manufacturer: </strong> {manufacturer_name}
                </li>
              );
            }
          )}
        </div>
      );
    }
  }

  render() {
    if (this.props.isSearching)
      return <h4 className="patient-search-info-box">Searching ...</h4>;
  
    return (
      <div className="row">
        <div className="col-md-6">
          <div>{this.renderRxImageSearchResults()}</div>
        </div>
        <div className="col-md-6">
          <div>{this.renderOpenFdaSearchResults()}</div>
        </div>
      </div>
    );
  }
}

export default SearchResults;
