import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { Button } from 'react-bootstrap';

import LabeledText from "../shared/LabeledText";
import Medicines from "./Medicines";
import PatientInfo from "./PatientInfo";
import { getPatient } from '../../actions/patient-actions';
import { getPrescriptions } from '../../actions/medicine-actions';


class PatientDetail extends Component {
  constructor() {
    super()

    this.onPrescriptionClick = this.onPrescriptionClick.bind(this);
  }

  componentWillMount() {
    window.scrollTo(0,0);    
    this.props.getPatient(this.props.match.params.patientId);    
    this.props.getPrescriptions(this.props.match.params.patientId);
    
  }
  
  onPrescriptionClick(prescriptionId, ndc) {
    this.props.history.push({
      pathname: `/Patient/${this.props.patientDetail.patientId}/EditPrescription/${prescriptionId}`,
      state: {ndc: ndc}
    })
  }

  render() {
    if (this.props.noResults){
      return (
        <h1>Couldn't find a patient with Patient ID {this.props.match.params.patientId}</h1>
      )
    }
    if (!this.props.patientDetail || !this.props.prescriptionsDetail) {
      return (
        <div>Loading...</div>
      )
    }

    console.log("Detail before info", this.props)
    const patientDetail = this.props.patientDetail;
    return (
      <div>
        <h1>
          Patient Details For {patientDetail.fullName} 
        </h1>
        <div className="row" >
          <div className="col-sm-12 col-lg-4">
            <div className="text-center">
              <h3 style={{display: "inline-block",paddingBottom: "25px"}}>
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
            <PatientInfo
              patientDetail={patientDetail}
              isOneColumn={true}
            />
            
          </div>
          <div className="col-sm-12 col-lg-8">
          <div className="text-center">
            <h3 style={{display: "inline-block", paddingBottom: "25px"}}>
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
            <Medicines onPrescriptionClick={this.onPrescriptionClick} prescriptionsDetail={this.props.prescriptionsDetail}/>
            
          </div>
        </div>
        <div className="row" style={{ paddingTop: "25px" }}>
             
                <Link 
                  to="/MainMenu" 
                  className="btn pull-right btn-danger margin-right">
                      Main Menu
                </Link>
                
          
          </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log("Mapstatetoprops in details", state);
  return { 
    patientDetail: state.patients.patientDetails,
    prescriptionsDetail: state.medicine.prescriptionsDetail,
    noResults: state.patients.noResults
  }
}

export default connect(mapStateToProps, { getPatient, getPrescriptions })(PatientDetail);
