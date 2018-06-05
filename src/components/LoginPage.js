import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";


import { login } from "../actions/auth-actions";

class LoginPage extends Component {

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-error" : null}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type={field.type}
                    {...field.input}
                    autoComplete="off"
                />
                <span className="text-danger">
                    {touched ? error : null}
                </span>
            </div>
        );
    }

    onSubmit(event) {
        const loginData = {
            userName: event.userName,
            password: event.password
        }
       
        this.props.login(loginData, () => {
            this.props.history.push('/MainMenu');
        });

    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <h3>Login</h3>
                
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div>
                        <Field
                            label="Username"
                            name="userName"
                            type="text"
                            component={this.renderField}
                        />

                        <Field
                            label="Password"
                            name="password"
                            type="password"
                            component={this.renderField}
                        />
                        <button className="btn btn-primary" to="/MainMenu">Login</button>

                    </div>
                </form>
            </div>

        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.userName)
        errors.userName = "Username is required"

    if (!values.password)
        errors.password = "Password is required"

    return errors;
}


export default reduxForm({
    validate,
    form: "LoginForm"
})(
    connect(null, { login })(LoginPage)
    );