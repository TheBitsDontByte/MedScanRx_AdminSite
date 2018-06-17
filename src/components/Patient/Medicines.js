import React from "react";
import _ from "lodash";

const Medicines = props => {
  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>MedineName</th>
          <th>Dosage</th>
          <th>Frequency</th>
          <th>NDC</th>
        </tr>
      </thead>
      <tbody>
        {_.map(props.prescriptionsDetail, detail => {
          return (
       
            <tr
              onClick={() =>
                props.onPrescriptionClick(detail.prescriptionId, detail.ndc)
              }
            >
              <td>{detail.brandName}</td>
              <td>{detail.dosage}</td>
              <td>{detail.nextAlert}</td>
              <td>{detail.ndc}</td>
             
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Medicines;
