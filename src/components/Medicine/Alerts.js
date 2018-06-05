import React, { Component } from "react";
import { Field, FieldArray, reduxForm, formValueSelector } from "redux-form";
import { Button, ButtonGroup, Alert } from "react-bootstrap";
import { connect } from "react-redux";

const times = [
  "12:00 AM",
  "1:00 AM",
  "2:00 AM",
  "3:00 AM",
  "4:00 AM",
  "5:00 AM",
  "6:00 AM",
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
  "11:00 PM"
];

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
      showOptional: false,
      dosesPerDay: 3
    };

    this.renderSelectList = this.renderSelectList.bind(this);
    this.renderRegularAlertsFiled = this.renderRegularAlertsFiled.bind(this);
  }

  renderSelectList(fields) {
    return fields.map((time, index) => (
      <div className="row" style={{paddingTop: 5}}>
        <div className="form-inline">
          <label style={{marginRight: 10}}>{`Alert #${index + 1}`}</label>
          <Field
          style={{width: "75%"}}
            name={time}
            component="select"
            label={`Time #${index + 1}`}
            className="form-control"
          >
            <option hidden value="">
              Select a time...
            </option>
            {times.map(time => {
              return (
                <option key={time} value={time}>
                  {time}
                </option>
              );
            })}
          </Field>

          {/* <span>{error}</span> */}
        </div>
      </div>
    ));
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
      <div className="col-sm-offset-1 ">
        {this.renderSelectList(fields)}
        <div style={{ paddingTop: 10 }} />
      </div>
    );
  }

  onDosesPerDayChange(event) {
    if (event.target.value > 9 || event.target.value < 1) return;
    this.setState({ dosesPerDay: event.target.value });
  }

  render() {
    const { dosesPerDay } = this.state;
    return (
      <div>
        <div className="col-sm-12 form-inline">
          <label>
            Doses per day:
            <input
              value={dosesPerDay}
              type="number"
              onChange={this.onDosesPerDayChange.bind(this)}
              style={{ marginLeft: 10, width: 75 }}
              className="form-control"
            />
          </label>
        </div>
        <div>
          <FieldArray
            label="Scheduled Times"
            name="scheduledTimes"
            component={this.renderRegularAlertsFiled}
            numberOfFields={dosesPerDay}
          />
        </div>
      </div>
    );
  }
}

// Alerts = reduxForm({
//   form: "AddMedicine"
// })(Alerts)

const selector = formValueSelector("AddMedicine");

export default connect(state => {
  const numberOfDoses = selector(state, "numberOfDoses") || 1;
  return { numberOfDoses };
})(Alerts);
