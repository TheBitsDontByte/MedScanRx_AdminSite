import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { getPrescriptionDetail } from "../../actions/medicine-actions";
import { Thumbnail, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import _ from 'lodash';

import AddEditMedicineFields from "../shared/AddEditMedicineFields";
import NoImage from "../../media/No_image.svg";
import { updatePrescriptionDetail } from '../../actions/medicine-actions'
import {calculateAlerts} from './AddMedicineHelperFunctions'



class EditMedicine extends Component {
  state = {editingAlerts: false}

  onEditAlertsClick() {
    this.setState({editingAlerts: true})
  }

  componentWillMount() {
    this.props.getPrescriptionDetail(this.props.match.params.prescriptionId);
  }

  handleEditSubmit(values) {
    let putData = {...values};
    if (putData.scheduledAlerts)
      putData.scheduledAlerts = calculateAlerts(putData, true);

    console.log("Submitting", this.props.history)
    this.props.updatePrescriptionDetail(putData, this.props.history.goBack);
  }


  render() {
    let { prescriptionDetail } = this.props;

    if (!prescriptionDetail) {
      return (
        <div className="row text-center">
          <h2>Loading Prescription...</h2>
        </div>
      );
    }
   
    return (
      <div className="row">
        <h2>Edit {prescriptionDetail.prescriptionName}</h2>
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
                    {prescriptionDetail.scheduledAlerts.map(alert => (
                      <tr>
                        <td>{alert}</td>
                        <td>Implement</td>
                        <td>Implement</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className="col-sm-6">
            <div className="row">
              <form onSubmit={this.props.handleSubmit(this.handleEditSubmit.bind(this))}>
                <AddEditMedicineFields editing={true} editingAlerts={this.state.editingAlerts} onEditAlertsClick={this.onEditAlertsClick.bind(this)}/>
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
      </div>
    );
  }
}

const validate = values => {
  console.log(values);
  let errors = {};

  if (!values.ndc || values.ndc == "") errors.ndc = "Please select the correct NDC";

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

  console.log("errors", errors)
  return errors;
}

const mapStateToProps = (state, ownProps) => {
  if (state.medicine.prescriptionDetail) {
    return {
      prescriptionDetail: state.medicine.prescriptionDetail,
      initialValues: {
        ...state.medicine.prescriptionDetail,
        dosesPerDay: 3,
        scheduledAlerts: null
      }
    };
  }

  return{};
};

export default connect(
  mapStateToProps,
  { getPrescriptionDetail, updatePrescriptionDetail }
)(reduxForm({validate, form: "EditMedicine" })(EditMedicine));
