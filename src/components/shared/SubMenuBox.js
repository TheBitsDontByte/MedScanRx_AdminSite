import React from "react";

const SubMenuBox = (props) => {
  return (
    <div className="sub-menu-box col-md-4 text-center">
      <div className="main-menu-sub-header">
        <h3>{props.label}</h3>
      </div>
      <div>
        <div className="row ">
          <div className="col-md-offset-1 col-md-10">
                {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubMenuBox