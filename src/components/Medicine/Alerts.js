import React, { Component } from "react";
import { Field, FieldArray, reduxForm, formValueSelector } from "redux-form";
import { Button, ButtonGroup, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import moment from "moment";

let times = [];
for (let i = 0; i < 24; i++) {
  times.push(
    moment()
      .hour(i)
      .minute(0)
      .seconds(0)
  );
}

const REGULAR = "R",
  TAPER = "T",
  INTERVAL = "I",
  OPTIONAL = "O";

class Alerts extends Component {
  constructor() {
    super();
    this.state = {
      showRegular: false,
      showTaper: false,
      showInterval: false,
      showOptional: false
    };

    this.renderSelectList = this.renderSelectList.bind(this);
    this.renderRegularAlertsFiled = this.renderRegularAlertsFiled.bind(this);
  }

  renderSelectList(fields) {
    return fields.map((field, index) => {
      return (
      <div style={{ paddingTop: 5 }}>
        <div className="form-inline">
          <label style={{ marginRight: 10 }}>{`Alert #${index + 1}`}</label>
          <Field
            style={{ width: "75%" }}
            name={field}
            component="select"
            label={`Time #${index + 1}`}
            className="form-control"
          >
            <option hidden value="">
              Select a time...
            </option>
            {times.map(time => {
              return (
                <option key={time} value={time.format()}>
                  {time.format("h:mm A")}
                </option>
              );
            })}
          </Field>

          {/* <span>{error}</span> */}
        </div>
      </div>
    )});
  }

  renderRegularAlertsFiled({
    label,
    fields,
    meta,
    numberOfFields,
    meta: { error, submitFailed }
  }) {
    for (let i = fields.length; i < numberOfFields; i++) fields.push({});
    for (let i = fields.length; i > numberOfFields; i--) fields.pop({});
    return (
      <div>
        {this.renderSelectList(fields)}
        <div style={{ paddingTop: 10 }} />
        {error && submitFailed && <div className="text-danger"> {error}</div>}
      </div>
    );
  }

  renderRadioButton(field) {
    const { input, meta, radioButtons, name } = field;
    const hasError = meta.touched && meta.error;
    return (
      <div>
        {radioButtons.map(rb => (
          <label key={rb.value} className={rb.labelClass}>
            <input {...input} type="radio" value={rb.value} />
            {rb.label}
          </label>
        ))}
        {hasError && <div><span className="text-danger">{meta.error}</span></div>}
      </div>
    );
  }

  onDosesPerDayChange(event) {
    if (event.target.value > 9 || event.target.value < 1) return;
    this.setState({ dosesPerDay: event.target.value });
  }

  render() {
    const { numberOfDoses } = this.props;
    return (
      <div>
        <div className="col-sm-12 form-inline">
          <label>
            Doses per day:
            <Field
              component="input"
              type="number"
              className="form-control"
              name="dosesPerDay"
              style={{ marginLeft: 10, width: 75 }}
              onChange={this.onDosesPerDayChange.bind(this)}
            />
          </label>
        </div>
        <div className="col-sm-10">
          <Field
            component={this.renderRadioButton}
            name="startDay"
            radioButtons={[
              { value: "today", label: "Start Today " },
              {
                value: "tomorrow",
                label: "Start Tomorrow ",
                labelClass: "pull-right"
              }
            ]}
          />
        </div>
        <div className="col-sm-12">
          <FieldArray
            label="Scheduled Times"
            name="scheduledAlerts"
            component={this.renderRegularAlertsFiled}
            numberOfFields={numberOfDoses}
          />
        </div>
      </div>
    );
  }
}

const selector = formValueSelector("AddMedicine");

export default connect(state => {
  const numberOfDoses = selector(state, "dosesPerDay") || 3;
  return { numberOfDoses, initialValues: { dosesPerDay: numberOfDoses } };
})(reduxForm({ form: "AddMedicine" })(Alerts));
