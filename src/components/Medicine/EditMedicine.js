import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { getPrescriptionDetail } from "../../actions/medicine-actions";
import { Thumbnail, Button } from "react-bootstrap";
import { Link, Prompt } from "react-router-dom";
import _ from "lodash";
import moment from "moment";

import AddEditMedicineFields from "../shared/AddEditMedicineFields";
import NoImage from "../../media/No_image.svg";
import {
  updatePrescriptionDetail,
  deletePrescription
} from "../../actions/medicine-actions";
import MedicineConfirmModal from "./MedicineConfirmModal";
import { calculateAlerts } from "./AddMedicineHelperFunctions";
import ErrorBanner from "../shared/ErrorBanner";

class EditMedicine extends Component {
  state = { editingAlerts: false, isDeleting: false, showModal: false };

  onEditAlertsClick() {
    this.setState({ editingAlerts: true });
  }

  componentWillMount() {
    this.props.getPrescriptionDetail(this.props.match.params.prescriptionId);
  }

  handleDeleteClick() {
    let confirmed = window.confirm(
      "Are you sure you want to delete this prescription ?"
    );
    if (confirmed) {
      let { prescriptionId, patientId } = this.props.match.params;
      this.setState({ isDeleting: true });
      this.props.deletePrescription(prescriptionId, patientId, () =>
        this.props.history.replace(`/Patient/${patientId}`)
      );
    }
  }

  handleEditSubmit(values) {
    let prescriptionDetails = { ...values };
    if (prescriptionDetails.scheduledAlerts)
      prescriptionDetails.scheduledAlerts = calculateAlerts(
        prescriptionDetails,
        true
      );

    this.setState({ prescriptionDetails, showModal: true });
  }

  savePrescription() {
    this.setState({ showModal: false });
    let { prescriptionDetails } = this.state;
    console.log("Saving prescription", prescriptionDetails)
    this.props.updatePrescriptionDetail(prescriptionDetails, () =>
      this.props.history.replace(`/Patient/${prescriptionDetails.patientId}`)
    );
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  renderError() {
    return (
      <div className="row">
        <ErrorBanner
          errors={this.props.errors}
        />
        <Link
          to={`/MainMenu`}
          className="btn pull-right btn-danger margin-right"
          style={{ marginTop: 20 }}
        >
          Main Menu
        </Link>
      </div>
    );
  }

  render() {
    let { prescriptionDetail } = this.props;

    if (this.props.noSuccess && !prescriptionDetail) {
      return this.renderError();
    }

    if (!prescriptionDetail) {
      return (
        <div className="row text-center">
          <h2>Loading Prescription...</h2>
        </div>
      );
    }

    this.props.noSuccess && this.props.errors && window.scrollTo(0, 0)
    
    return (
      <div className="row">
        <h2>Edit {prescriptionDetail.prescriptionName}</h2>
        <Button
          onClick={this.handleDeleteClick.bind(this)}
          bsStyle="danger margin-right"
        >
          Delete Prescription
        </Button>
        <span style={{ fontSize: 20 }} className="margin-right text-danger">
          This should ONLY be used when changing the NDC or RxImage or when the
          patient stops taking the medicine
        </span>
        <ErrorBanner errors={this.props.errors} />
        <div className="row">
          <div className="col-sm-6">
            <h3>Medicine Image</h3>
            <div className="col-offset-sm-1 col-sm-10">
              {prescriptionDetail.imageUrl ? (
                <Thumbnail src={prescriptionDetail.imageUrl} />
              ) : (
                <Thumbnail src={NoImage} />
              )}
            </div>
            <div className="row" />
            <h3>All Alerts</h3>
            <div className="col-offset-sm-1 col-sm-10">
              {prescriptionDetail && (
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Alert Time</th>
                      <th>Active ?</th>
                      <th>Taken ?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptionDetail.scheduledAlerts.map(
                      ({ alertDateTime, takenDateTime, isActive }) => (
                        <tr>
                          <td>
                            {moment(alertDateTime).format("MMMM Do, h:mm:ss a")}
                          </td>
                          <td>{isActive ? "Yes" : "No"} </td>
                          <td>{takenDateTime ? "Yes" : "No"} </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className="col-sm-6">
            <div className="row">
              <form
                onSubmit={this.props.handleSubmit(
                  this.handleEditSubmit.bind(this)
                )}
              >
                <AddEditMedicineFields
                  editing={true}
                  editingAlerts={this.state.editingAlerts}
                  onEditAlertsClick={this.onEditAlertsClick.bind(this)}
                />
                <div className="col-sm-12">
                  <Button
                    type="submit"
                    bsStyle="success"
                    className="pull-right"
                  >
                    Save
                  </Button>
                  <Button
                    className="pull-right margin-right"
                    bsStyle="primary"
                    componentClass={Link}
                    to={`/Patient/${this.props.match.params.patientId}`}
                  >
                    Patient Details
                  </Button>
                  <Button
                    to="/MainMenu"
                    bsStyle="danger"
                    className="pull-right margin-right"
                    componentClass={Link}
                  >
                    Main Menu
                  </Button>
                </div>
              </form>
            </div>
            <div className="row" />
          </div>
        </div>
        {this.state.prescriptionDetails && (
          <MedicineConfirmModal
            showModal={this.state.showModal}
            closeModal={this.closeModal.bind(this)}
            savePrescription={this.savePrescription.bind(this)}
            prescriptionDetails={this.state.prescriptionDetails}
          />
        )}
        <Prompt
          when={
            ((this.props.anyTouched && !this.props.submitSucceeded) ||
              this.props.noSuccess == true) &&
            !this.state.isDeleting
          }
          message={"Navigating away will clear all your data. Continue ?"}
        />
      </div>
    );
  }
}

const validate = values => {
  let errors = {};

  if (!values.ndc || values.ndc == "")
    errors.ndc = "Please select the correct NDC";

  if (!values.prescriptionName)
    errors.prescriptionName = "Prescription Name is required";

  if (!values.currentNumberOfDoses)
    errors.currentNumberOfDoses = "Number of Doses is required";

  if (!values.currentNumberOfRefills)
    errors.currentNumberOfRefills = "Number of Refills is required";

  if (!values.dosage) errors.dosage = "Dosage is required";

  if (!values.shape) errors.shape = "Shape is required";

  if (!values.identifiers)
    errors.identifiers = "Unique Identifiers is required";

  if (!values.color) errors.color = "Color is required";

  if (!values.startDay) errors.startDay = "A starting day is required";

  if (values.scheduledAlerts) {
    for (let i = 0; i < values.scheduledAlerts.length; i++) {
      if (_.isEmpty(values.scheduledAlerts[i])) {
        errors.scheduledAlerts = {
          _error: "Times must be selected for all alerts"
        };
      }
    }
  }

  if (
    values.scheduledAlerts &&
    !errors.scheduledAlerts &&
    _.uniq(values.scheduledAlerts).length != values.scheduledAlerts.length
  )
    errors.scheduledAlerts = {
      _error: "Duplicate alert times are not allowed"
    };

  return errors;
};

const mapStateToProps = (state, ownProps) => {
  if (state.medicine.prescriptionDetail) {
    return {
      prescriptionDetail: state.medicine.prescriptionDetail,
      initialValues: {
        ...state.medicine.prescriptionDetail,
        dosesPerDay: 3,
        scheduledAlerts: null
      },
      noSuccess: state.medicine.noSuccess,
      errors: state.medicine.errors
    };
  }

  return {
    noSuccess: state.medicine.noSuccess,
    errors: state.medicine.errors
  };
};

export default connect(
  mapStateToProps,
  { getPrescriptionDetail, updatePrescriptionDetail, deletePrescription }
)(reduxForm({ validate, form: "EditMedicine" })(EditMedicine));
