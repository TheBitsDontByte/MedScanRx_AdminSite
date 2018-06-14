import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearData } from '../actions/patient-actions';
import { Button } from 'react-bootstrap';


class MainMenu extends Component {
    
    componentWillMount() {
        this.props.clearData();
    }

    render() {
        return (
            <div className="row">
                <h1>Welcome, {this.props.loginName}</h1>
                <div className="row" style={{paddingTop: "25px"}}>
                    <div className="col-md-6 text-center">
                        <Button
                            bsStyle="primary"
                            bsSize="lg"
                            componentClass={Link}
                            to="/Patient/Add"   //Hard coded for now, need to change this
                        >Add a Patient</Button>
                    </div>
                    <div className="col-md-6 text-center">
                        <Button
                            bsStyle="primary"
                            bsSize="lg"
                            componentClass={Link}
                            to="/Search/AllPatients"   //Hard coded for now, need to change this
                        >Search Patients</Button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {loginName: state.authentication.userName};
}

export default connect(mapStateToProps, { clearData })(MainMenu);