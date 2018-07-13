import React, { Component } from "react";
import { Field } from "redux-form";
import _ from "lodash";
import { Button } from "react-bootstrap";

import Alerts from "../Medicine/Alerts";
import AlertsEdit from "../Medicine/AlertsEdit";

class AddEditMedicineFields extends Component {

  renderField = field => {
    const { touched, error } = field.meta;
    const className = `form-group ${touched && error ? "has-error" : ""}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control "
          type={field.type}
          {...field.input}
          autoComplete="off"
        />
        <div className="text-danger">{touched ? error : ""}</div>
      </div>
    );
  };

  displayScheduledAlerts() {
    return _.map(this.props.scheduledAlerts, (alert, index) => {
      return (
        <div style={{ margin: 5 }}>
          <label
            className="control-label"
            style={{ width: 100, paddingLeft: 12 }}
          >
            Alert #{index + 1}
          </label>
          <input
            className="form-control"
            type="datetime"
            value={alert}
            readOnly
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Medicine Details</h3>
        <div className="col-sm-offset-1 col-sm-11">
          <div className="col-sm-6 form-group">
            <label>NDC:</label>
            <Field name="ndc" className="form-control" component="select">
              <option hidden value="">
                Select the correct NDC...
              </option>

              {typeof this.props.ndc == "string" ? (
                <option value={this.props.ndc}>{this.props.ndc}</option>
              ) : (
                _.map(this.props.ndc, ndc => {
                  return <option value={ndc}>{ndc}</option>;
                })
              )}
            </Field>
          </div>
          <div className="row" />
          <div className="col-sm-6">
            <Field
              type="text"
              name="originalNumberOfDoses"
              label="Number of Doses: "
              component={this.renderField}
            />
            <Field
              type="text"
              name="originalNumberOfRefills"
              label="Number of Refills: "
              component={this.renderField}
            />

            <Field
              type="text"
              name="dosage"
              label="Dosage:"
              component={this.renderField}
            />
          </div>
          <div className="col-sm-6">
            <Field
              type="text"
              name="shape"
              label="Shape: "
              component={this.renderField}
            />

            <Field
              type="text"
              name="identifiers"
              label="Unique Identifiers:"
              component={this.renderField}
            />
            <Field
              type="text"
              name="color"
              label="Color:"
              component={this.renderField}
            />
          </div>
          <div className="col-sm-12">
            <Field
              type="text"
              name="barcode"
              label="Barcode on Bottle:"
              component={this.renderField}
            />
            <Field
              type="text"
              name="warnings"
              label="Warnings:"
              component={this.renderField}
            />
            <Field
              type="text"
              name="doctorNotes"
              label="Doctor's Notes:"
              component={this.renderField}
            />
          </div>
        </div>
        <h3 style={{ display: "inline-block" }}>Scheduled Alerts</h3>{" "}
        {this.props.allowEdits ? (
          <Button
            bsStyle="primary"
            style={{ marginBottom: 10, marginLeft: 35 }}
            onClick={() => this.props.onToggleAlert()}
          >
            {this.props.showCurrentAlerts
              ? "Show Schedule Picker"
              : "Show Current Alerts"}
          </Button>
        ) : null}
        <div className="col-sm-offset-1 col-sm-11">
          {/* Have a button ? checkbox ? something to indicate switching between showing alerts and .adding this guy */}
          {this.props.allowEdits ? (
            this.props.showCurrentAlerts ? (
              <div className="form-inline">{this.displayScheduledAlerts()}</div>
            ) : this.props.allowEdits ? (
              <AlertsEdit />
            ) : (
              <Alerts />
            )
          ) : this.props.allowEdits ? (
            <AlertsEdit />
          ) : (
            <Alerts />
          )}
        </div>
      </div>
    );
  }
}
export default AddEditMedicineFields;
