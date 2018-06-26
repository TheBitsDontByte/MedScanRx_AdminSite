import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import LabeledText from "../shared/LabeledText";
import Medicines from "./Medicines";
import PatientInfo from "./PatientInfo";
import ErrorBanner from "../shared/ErrorBanner";
import { getPatient } from "../../actions/patient-actions";
import { getPrescriptions } from "../../actions/medicine-actions";

class PatientDetail extends Component {
  constructor() {
    super();

    this.onPrescriptionClick = this.onPrescriptionClick.bind(this);
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    this.props.getPatient(this.props.match.params.patientId);
    this.props.getPrescriptions(this.props.match.params.patientId);
  }

  onPrescriptionClick(prescriptionId, ndc) {
    this.props.history.push({
      pathname: `/Patient/${
        this.props.patientDetail.patientId
      }/EditPrescription/${prescriptionId}`,
      state: { ndc: ndc }
    });
  }

  renderError() {
    return (
      <div className="row">
        <ErrorBanner errors={this.props.patientErrors} />
        <Link
          to="/MainMenu"
          className="btn pull-right btn-danger margin-right"
          style={{ marginTop: 20 }}
        >
          Main Menu
        </Link>
      </div>
    );
  }

  render() {
    if (this.props.patientNoSuccess) {
      return this.renderError();
    }

    if (!this.props.patientDetail || !this.props.prescriptionsDetail) {
      return (
        <div className="row text-center">
          <h2>Loading Patient Details...</h2>
        </div>
      );
    }

    const patientDetail = this.props.patientDetail;
    return (
      <div className="row">
        <h2>Patient Details For {patientDetail.fullName}</h2>
        <div className="row">
          <div className="col-sm-12 col-lg-4">
            <div className="text-center">
              <h3 style={{ display: "inline-block", paddingBottom: "25px" }}>
                Patient Information
              </h3>
              <Button
                bsStyle="link"
                componentClass={Link}
                to={`/Patient/${patientDetail.patientId}/Edit`}
              >
                Edit Info
              </Button>
            </div>
            <PatientInfo patientDetail={patientDetail} isOneColumn={true} />
          </div>
          <div className="col-sm-12 col-lg-8">
            <div className="text-center">
              <h3 style={{ display: "inline-block", paddingBottom: "25px" }}>
                Currently Prescribed Medicines
              </h3>
              <Button
                bsStyle="link"
                componentClass={Link}
                to={`/Patient/${patientDetail.patientId}/SearchMedicine`}
              >
                Add Medicine
              </Button>
            </div>
            <Medicines
              onPrescriptionClick={this.onPrescriptionClick}
              prescriptionsDetail={this.props.prescriptionsDetail}
            />
          </div>
        </div>
        <div className="row" style={{ paddingTop: "25px" }}>
          <Link
            to="/MainMenu"
            className="btn pull-right btn-danger margin-right"
          >
            Main Menu
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    patientDetail: state.patients.patientDetails,
    prescriptionsDetail: state.medicine.prescriptionsDetail,
    patientNoSuccess: state.patients.noSuccess,
    patientErrors: state.patients.errors
  };
}

export default connect(
  mapStateToProps,
  { getPatient, getPrescriptions }
)(PatientDetail);
