import React from "react";
import { Field } from "redux-form";
import _ from "lodash";

import Alerts from "../Medicine/Alerts";

const renderField = field => {
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

const AddEditMedicineFields = props => {
  console.log(props);
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
            {_.map(props.ndc, ndc => {
              return <option value={ndc}>{ndc}</option>;
            })}
          </Field>
        </div>
        <div className="row" />
        <div className="col-sm-6">
          <Field
            type="text"
            name="originalNumberOfDoses"
            label="Number of Doses: "
            component={renderField}
          />
          <Field
            type="text"
            name="originalNumberOfRefills"
            label="Number of Refills: "
            component={renderField}
          />

          <Field
            type="text"
            name="dosage"
            label="Dosage:"
            component={renderField}
          />
        </div>
        <div className="col-sm-6">
          <Field
            type="text"
            name="shape"
            label="Shape: "
            component={renderField}
          />

          <Field
            type="text"
            name="identifiers"
            label="Unique Identifiers:"
            component={renderField}
          />
          <Field
            type="text"
            name="color"
            label="Color:"
            component={renderField}
          />
        </div>
        <div className="col-sm-12">
          <Field
            type="text"
            name="barcode"
            label="Barcode on Bottle:"
            component={renderField}
          />
          <Field
            type="text"
            name="warnings"
            label="Warnings:"
            component={renderField}
          />
          <Field
            type="text"
            name="doctorNotes"
            label="Doctor's Notes:"
            component={renderField}
          />
        </div>
      </div>
      <h3>Scheduled Alerts</h3>
      <div className="col-sm-offset-1 col-sm-11">
        <Alerts />
      </div>
    </div>
  );
};

export default AddEditMedicineFields;
