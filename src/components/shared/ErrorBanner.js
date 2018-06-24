import React from "react";
import _ from "lodash";

const ErrorBanner = props => {
  return (
    <div className="error-banner">
      {typeof props.errors == "string"
        ? props.errors
        : _.map(props.errors, error => {
            return <div className="row">{error}</div>;
          })}
    </div>
  );
};

export default ErrorBanner;
