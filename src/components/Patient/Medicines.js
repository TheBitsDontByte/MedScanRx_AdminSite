import React from "react";
import _ from "lodash";

const Medicines = props => {
  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Prescirption Name</th>
          <th>Dosage</th>
          <th>Next Alert</th>
          <th>NDC</th>
        </tr>
      </thead>
      <tbody>
        {_.map(props.prescriptionsDetail, (detail, index) => {
          return (
            <tr
              onClick={() =>
                props.onPrescriptionClick(index)
              }
            >
              <td>{detail.prescriptionName}</td>
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
