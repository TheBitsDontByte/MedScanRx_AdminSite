import React from "react";
import LabeledText from '../shared/LabeledText';

const PatientInfo = ({ patientDetail, isOneColumn = false }) => {
  return (
    <div>
      <div className={isOneColumn ? "col-sm-12 col-lg-12" : "col-sm-12 col-lg-6"}>
        <LabeledText label="Is Active Patient: " text={patientDetail.isActive ? "Yes" : "No"} />      
        <LabeledText label="Patient ID: " text={patientDetail.patientId} />
        <LabeledText label="First Name: " text={patientDetail.firstName} />
        <LabeledText label="Last Name: " text={patientDetail.lastName} />
        <LabeledText label="Email: " text={patientDetail.email} />
        <LabeledText label="Phone Number: " text={patientDetail.phone1} />
        <LabeledText
          label="Secondary Phone Number"
          text={patientDetail.phone2}
        />
      </div>

      <div className={isOneColumn ? "col-sm-12 col-lg-12" : "col-sm-12 col-lg-6"}>
        <LabeledText
          label="Emergency Contact: " 
          text={patientDetail.emergencyContactName}
        />
        <LabeledText
          label="Emergency Relation: "
          text={patientDetail.emergencyContactRelation}
        />
        <LabeledText
          label="Emergency Contact Phone:"
          text={patientDetail.emergencyContactPhone} 
        />
        <LabeledText
          label="Preferred Hospital:"
          text={patientDetail.preferredHospital}
        />
        <LabeledText
          label="Preferred Physician:"
          text={patientDetail.preferredPhysician}
        />

      </div>
    </div>
  );
};

export default PatientInfo;
