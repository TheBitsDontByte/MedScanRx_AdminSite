import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class AddPatientConfirmModal extends Component {

  componentWillReceiveProps(newProps) {
      this.setState({
          showModal: newProps.showModal
      })
  }

  render() {
    console.log("Modal props", this.props)
    let patientDetails = this.props.patientDetails;

    return (
      <Modal show={this.props.showModal}>
        <Modal.Header>
          <h3>Please confirm the patient's information</h3>
        </Modal.Header>
        <Modal.Body>
          <h4>Patient Information</h4>
          <div className="col-xs-offset-1">
            First Name: <strong className="bold">{patientDetails.firstName}</strong><br />
            Last Name: <strong className="bold">{patientDetails.lastName}</strong><br />
            Date of Birth: <strong className="bold">{ patientDetails.dateOfBirth }</strong><br />
            Gender: <strong className="bold">{patientDetails.gender}</strong><br />
          </div>
          <h4>Contact Information</h4>
          <div className="col-xs-offset-1">
            Email: <strong className="bold">{patientDetails.email}</strong><br />
            Primary Phone: <strong className="bold">{ patientDetails.phone1}</strong><br />
            Secondary Phone: <strong className="bold">{patientDetails.phone2}</strong><br />
            Primary Physician: <strong className="bold">{patientDetails.preferredPhysician }</strong><br />
            Preferred Hospital: <strong className="bold">{patientDetails.preferredHospital }</strong><br />
            Emergency Contact: <strong className="bold">{patientDetails.emergencyContactName}</strong><br />
            Emergency Contact Relation: <strong className="bold">{patientDetails.emergencyContactRelation}</strong><br />
            Emergency Contact Phone: <strong className="bold">{patientDetails.emergencyContactPhone}</strong><br />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button 
            onClick={this.props.closeModal}
            bsStyle="primary"
          >
            Edit Info
          </Button>
          <Button 
            onClick={this.props.savePatientInfo}
            bsStyle="success"
          >
            Confirm and Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddPatientConfirmModal;
