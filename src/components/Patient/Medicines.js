import React from 'react';

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
          <tr>
            <th scope="row">Tylenol</th>
            <td>200mg</td>
            <td>Once Daily</td>
            <td>123</td>
          </tr>
          <tr>
            <th scope="row">Benadryl</th>
            <td>15mg</td>
            <td>Every 4 hours</td>
            <td>234</td>
          </tr>
          <tr>
            <th scope="row">Vicodin</th>
            <td>5mg</td>
            <td>Every 6 hours</td>
            <td>333</td>
          </tr>
        </tbody>
      </table>

        
    );
}

export default Medicines;