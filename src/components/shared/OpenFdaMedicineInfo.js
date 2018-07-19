import React from "react";
import _ from "lodash";
import LabeledText from "../shared/LabeledText";

class OpenFdaMedicineInfo extends React.Component {
  state = { selectedAdditionalDetail: null };

  componentWillMount() {
    window.scrollTo(0, 0);
  }

  handleAdditionalDetailChange(event) {
    this.setState({ selectedAdditionalDetail: event.target.value });
  }

  render() {
    let {
      brand_name,
      route,
      generic_name,
      product_type,
      package_ndc
    } = this.props.openFdaMedicineInfo.openfda;
    let { openFdaMedicineInfo } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-sm-offset-1">
            <LabeledText
              label="NDC:"
              text={_.map(package_ndc, ndc => {
                return ndc + ", ";
              })}
            />
            <LabeledText label="Generic Name: " text={generic_name} />
            <LabeledText label="Brand Name: " text={brand_name} />
            <LabeledText label="Route: " text={route} />
            <LabeledText label="Type: " text={product_type} />
          </div>
        </div>
        <div>
          <h3>Open FDA's Medicine Details</h3>
          <div className="row">
            <div className="col-sm-offset-1 col-sm-11">
              {openFdaMedicineInfo ? (
                <select
                  style={{maxWidth: "-webkit-fill-available"}}
                  className="form-control"
                  onChange={this.handleAdditionalDetailChange.bind(this)}
                >
                  <option hidden value="">
                    Select a category....
                  </option>
                  {_.map(openFdaMedicineInfo, (value, key) => {
                    if (key != "openfda")
                      return (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      );
                  })}
                </select>
              ) : null}
            </div>
          </div>
          {this.state.selectedAdditionalDetail && (
            <div className="row" style={{ marginTop: 10 }}>
              <div className="col-sm-offset-1 col-sm-11">
                <p style={{ padding: 10 }}>
                  {openFdaMedicineInfo[this.state.selectedAdditionalDetail]}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default OpenFdaMedicineInfo;
