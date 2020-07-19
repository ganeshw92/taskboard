import React from "react";
import "./topbar.css";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="projects-nav">
        <a href="#">
          <i className="fa fa-arrow-left" aria-hidden="true"></i>{" "}
          <span>All Projects</span>
        </a>
      </div>
      <div className="project-drop">
        <h3>
          Supermassive black hole{" "}
          <i className="fa fa-chevron-down" aria-hidden="true"></i>
        </h3>
      </div>
      <div className="topbar-controls">
        <ul>
          <li>
            <span className="controls">
              <i className="fa fa-search" aria-hidden="true"></i>
            </span>
          </li>
          <li>
            <span className="controls">
              <span className="badge">3</span>
              <i className="fa fa-bell-o" aria-hidden="true"></i>
            </span>
          </li>
          <li>
            <span className="controls user-img">
              <img
                src="https://www.clipartmax.com/png/small/171-1717870_stockvader-predicted-cron-for-may-user-profile-icon-png.png"
                alt="user"
              />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Topbar;
