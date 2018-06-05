import React from 'react';

const LabeledText = (props) => {
    return (
        <div className="col-sm-12 col-lg-12">
            <label className="bold-label">{props.label}</label>
            <span>{props.text}</span>
        </div>
    );
}

export default LabeledText;