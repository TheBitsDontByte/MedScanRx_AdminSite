import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { login, logout } from "../../actions/auth-actions";

class Header extends Component {
  onLoginLogout() {
    let { history } = this.props;

    this.props.logout(() => {
      history.push("/");
    });
  }

  render() {
    let { userName } = this.props;
    let loginOrOut = userName ? "Logout " + userName : "Login";
    return (
      <div className="header">
        <div className="row">
          <h4 className="header-left">
            Pharmatronix Administration
            <a className="pull-right" onClick={() => this.onLoginLogout()}>
              {loginOrOut}
            </a>
          </h4>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userName: state.authentication.userName
  };
}

export default withRouter(
  connect(mapStateToProps, {
    login,
    logout
  })(Header)
);
