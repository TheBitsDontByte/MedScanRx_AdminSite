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
          disabled={field.disabled}
        />
        <div className="text-danger">{touched ? error : ""}</div>
      </div>
    );
  };

  renderSelectField = field => {
    const { touched, error } = field.meta;
    const className = `form-group ${touched && error ? "has-error" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <select {...field.input} className="form-control">
          {field.children}
        </select>
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
          <div className="row">
            <div className="col-sm-6 ">
              {this.props.editing ? (
                <Field
                  type="text"
                  name="ndc"
                  label="NDC:"
                  component={this.renderField}
                  disabled
                />
              ) : (
                <Field
                  name="ndc"
                  component={this.renderSelectField}
                  label="NDC:"
                >
                  <option hidden value={null}>
                    Select the correct NDC...
                  </option>

                  {typeof this.props.ndc === "string" ? (
                    <option value={this.props.ndc}>{this.props.ndc}</option>
                  ) : (
                    _.map(this.props.ndc, ndc => {
                      return (
                        <option key={ndc} value={ndc}>
                          {ndc}
                        </option>
                      );
                    })
                  )}
                </Field>
              )}
            </div>
            <div className="col-sm-6">
              <Field
                type="text"
                name="prescriptionName"
                label="Prescription Name:"
                component={this.renderField}
              />
            </div>
          </div>
          {this.props.editing ? (
            <div className="row">
              <div className="col-sm-6">
                <Field
                  type="text"
                  name="currentNumberOfDoses"
                  label="Remaining Doses: "
                  component={this.renderField}
                  disabled={!this.props.editingAlerts}
                />
              </div>
              <div className="col-sm-6">
                <Field
                  type="text"
                  name="currentNumberOfRefills"
                  label="Remaining Refills: "
                  component={this.renderField}
                />
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-sm-6">
                <Field
                  type="text"
                  name="originalNumberOfDoses"
                  label="Number of Doses: "
                  component={this.renderField}
                />
              </div>
              <div className="col-sm-6">
                <Field
                  type="text"
                  name="originalNumberOfRefills"
                  label="Number of Refills: "
                  component={this.renderField}
                />
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-sm-6">
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
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <Field
                type="text"
                name="identifiers"
                label="Unique Identifiers:"
                component={this.renderField}
              />
            </div>
            <div className="col-sm-6">
              <Field
                type="text"
                name="color"
                label="Color:"
                component={this.renderField}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <Field
                type="text"
                name="warnings"
                label="Warnings:"
                component={this.renderField}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <Field
                type="text"
                name="doctorNotes"
                label="Doctor's Notes:"
                component={this.renderField}
              />
            </div>
          </div>
        </div>
        <div>
          <h3>Scheduled Alerts</h3>

          {this.props.editing && this.props.editingAlerts ? (
            <div className="col-sm-offset-1 col-sm-11">
              {/* TODO FIX THIS MAKE IT JUST ALERTS */}
              {this.props.editing ? <AlertsEdit dosesPerDay={3} /> : <Alerts />}
            </div>
          ) : this.props.editing ? (
            <div className="col-sm-offset-1 col-sm-11">
              <Button bsStyle="primary" onClick={this.props.onEditAlertsClick}>
                Edit Alerts/Remaining Doses
              </Button>
            </div>
          ) : (
            <div className="col-sm-offset-1 col-sm-11">
              <Alerts />
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default AddEditMedicineFields;
