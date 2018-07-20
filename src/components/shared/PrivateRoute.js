import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
    <Route {...rest} render={props => (
      isLoggedIn ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>
      )
    )}/>
  )

const mapStateToProps = (state, ownProps) => {
    return { isLoggedIn: state.authentication.isLoggedIn};
}

export default connect(mapStateToProps)(PrivateRoute);
