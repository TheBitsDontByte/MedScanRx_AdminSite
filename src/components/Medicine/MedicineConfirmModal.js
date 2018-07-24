import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";

class MedicineConfirmModal extends Component {
  componentWillReceiveProps(newProps) {
    this.setState({
      showModal: newProps.showModal
    });
  }

  render() {
    let { prescriptionDetails } = this.props;
    console.log(prescriptionDetails);
    return (
      <Modal show={this.props.showModal}>
        <Modal.Header>
          <h3>Please confirm the prescription information</h3>
        </Modal.Header>
        <Modal.Body>
          <h4>Prescription Information</h4>
          <div className="col-xs-offset-1">
            Prescription Name:{" "}
            <strong className="bold">
              {prescriptionDetails.prescriptionName}
            </strong>
            <br />
            Description:{" "}
            <strong className="bold">
              "{prescriptionDetails.color}" and "{prescriptionDetails.shape}"
              with "{prescriptionDetails.identifiers}" marking(s)
            </strong>
            <br />
            Dosage:{" "}
            <strong className="bold">{prescriptionDetails.dosage}</strong>
            <br />
            Doses Per Day:{" "}
            <strong className="bold">{prescriptionDetails.dosesPerDay}</strong>
            <br />
            Remaining Doses:{" "}
            <strong className="bold">
              {prescriptionDetails.currentNumberOfDoses ||
                prescriptionDetails.originalNumberOfDoses}
            </strong>
            <br />
            Remaining Refills:{" "}
            <strong className="bold">
              {prescriptionDetails.currentNumberOfRefills ||
                prescriptionDetails.originalNumberOfRefills}
            </strong>
            <br />
            Warnings:{" "}
            <strong className="bold">
              {prescriptionDetails.warnings || "(none)"}
            </strong>
            <br />
            Doctor's Notes:{" "}
            <strong className="bold">
              {prescriptionDetails.doctorNotes || "(none)"}
            </strong>
            <br />
            NDC: <strong className="bold">{prescriptionDetails.ndc}</strong>
            <br />
            RXCUI: <strong className="bold">{prescriptionDetails.rxcui}</strong>
            <br />
          </div>
          <h4>Scheduled Alerts</h4>

          <div className="col-xs-offset-1">
            {prescriptionDetails.scheduledAlerts &&
              prescriptionDetails.scheduledAlerts.map((alert, index) => (
                <div>
                  {" "}
                  Alert #{index + 1}{" "}
                  {moment(alert.alertDateTime, "YYYYMMDD HH:mm:ss").format(
                    "MMMM Do, h:mm:ss a"
                  )}
                </div>
              ))}
            {!prescriptionDetails.scheduledAlerts && (
              <div> No changes to alerts </div>
            )}
            <br />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.closeModal} bsStyle="primary">
            Edit Info
          </Button>
          <Button onClick={this.props.savePrescription} bsStyle="success">
            Confirm and Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default MedicineConfirmModal;
