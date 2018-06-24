import React from "react";
import { Field, reduxForm } from "redux-form";

import { nomalizePhone, normalizePhone } from "../shared/Normalize";
import { email } from "../shared/Validate";

class AddEditFields extends React.Component {
  renderField(field) {
    const {
      type,
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-error" : null}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input type={type} className="form-control" {...field.input} />
        <span className="text-danger">{touched ? error : null}</span>
      </div>
    );
  }

  renderSelectField(field) {
    const {
      meta: { touched, error },
      children
    } = field;
    const className = `form-group ${touched && error ? "has-error" : null}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <select className="form-control" {...field.input}>
          {children}
        </select>
        <span className="text-danger">{touched ? error : null}</span>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="col-sm-6">
          <Field
            name="firstName"
            label="First Name"
            component={this.renderField}
          />
          <Field
            name="lastName"
            label="Last Name"
            component={this.renderField}
          />
          <Field
            name="dateOfBirth"
            label="Date of Birth (MM/DD/YYYY)"
            component={this.renderField}
            type="date"
            //normalize={this.normalizeDate}
          />
          <Field
            name="gender"
            label="Gender"
            component={this.renderSelectField}
            value=""
          >
            <option value="" disabled>
              Gender...
            </option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </Field>
          <Field
            name="email"
            label="Email"
            type="email"
            component={this.renderField}
          />
          <Field
            name="phone1"
            label="Primary Phone Number"
            component={this.renderField}
            normalize={normalizePhone}
          />
          <Field
            name="phone2"
            label="Secondary Phone Number"
            component={this.renderField}
            normalize={normalizePhone}
          />
        </div>
        <div className="col-sm-6">
          <Field
            name="preferredPhysician"
            label="Preferred Physician"
            component={this.renderField}
          />
          <Field
            name="preferredHospital"
            label="Preferred Hospital"
            component={this.renderField}
          />
          <Field
            name="emergencyContactName"
            label="Emergency Contact Name"
            component={this.renderField}
          />
          <Field
            name="emergencyContactRelation"
            label="Relationship To Emergency Contact"
            component={this.renderField}
          />
          <Field
            name="emergencyContactPhone"
            label="Emergency Contact Phone"
            component={this.renderField}
            normalize={normalizePhone}
          />
        </div>
      </div>
    );
  }
}
export default AddEditFields;
