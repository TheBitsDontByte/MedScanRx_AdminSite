import React, { Component } from "react";
import { connect } from "react-redux";

class RedirectPage extends Component {
  state = {
    redirectTimeout: setTimeout(() => {
      this.props.history.push("/MainMenu");
    }, 3000)
  };

  onClickRedirect() {
    clearTimeout(this.state.redirectTimeout);
    this.props.history.push("/MainMenu");
  }

  componentWillUnmount() {
    clearTimeout(this.state.redirectTimeout);
  }

  render() {
    return (
      <div className="row text-center">
        <h1>Uh oh ... Something went wrong</h1>
        <h4>
          Click <a onClick={() => this.onClickRedirect()}>here</a> to be
          redirected to the main menu or wait 3 seconds...
        </h4>
      </div>
    );
  }
}

export default connect()(RedirectPage);
