import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
    <Route {...rest} render={props => (
      ///Changes for easy testing
      true ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>
      )
    )}/>
  )

function mapStateToProps (state, ownProps) {
    return { isLoggedIn: state.authentication.isLoggedIn};
}

export default connect(mapStateToProps)(PrivateRoute);