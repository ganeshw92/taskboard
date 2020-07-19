import React from "react";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <i className="fa fa-home" aria-hidden="true"></i>
      </div>
      <div className="menus">
        <ul>
          <li>
            <i className="fa fa-dashboard" aria-hidden="true"></i>
          </li>
          <li className="active">
            <i className="fa fa-calendar" aria-hidden="true"></i>
          </li>
          <li>
            <i className="fa fa-comment-o" aria-hidden="true"></i>
          </li>
          <li>
            <i className="fa fa-th-large" aria-hidden="true"></i>
          </li>
          <li>
            <i className="fa fa-clock-o" aria-hidden="true"></i>
          </li>
          <li>
            <i className="fa fa-cogs" aria-hidden="true"></i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
