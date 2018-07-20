import React from "react";

const SubMenuBox = props => {
  let className = props.removeCenter
    ? `sub-menu-box col-md-4 ${props.className}`
    : `sub-menu-box col-md-4 text-center ${props.className}`;
  return (
    <div className={className}>
      <div className="main-menu-sub-header text-center">
        <h3>{props.label}</h3>
      </div>
      <div>
        <div className="row ">
          <div className="col-md-offset-1 col-md-10">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default SubMenuBox;
