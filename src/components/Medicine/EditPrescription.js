import React, { Component } from "react";
import { connect } from "react-redux";

import { getPrescriptionDetail } from "../../actions/medicine-actions";

class EditPrescription extends Component {
  componentWillMount() {
      this.props.getPrescriptionDetail(this.props.match.params.prescriptionId)
  }

  render() {
    console.log(this.props);
    return <div>Im edit prescription</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
    return {};
}

export default connect(
  mapStateToProps,
  { getPrescriptionDetail }
)(EditPrescription);
