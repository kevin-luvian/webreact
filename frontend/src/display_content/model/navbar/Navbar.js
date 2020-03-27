import React, { Component } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navigation from "./Navigation";
import $ from "jquery";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  togglePull = () => {
    $(".page-container").toggleClass("sbar");
    $(".page-container").toggleClass("sbar_collapsed");
  };

  handleClick = () => {
    $(".dropdown-menu").slideToggle(300);
    setTimeout(function() {
      var display = $(".dropdown-menu").css("display");
      if (display === "block") $(".dropdown-menu").slideToggle(300);
    }, 10000);
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-container sbar_collapsed" id="page-container">
          <Sidebar />
          <div className="main-content pb-4">
            <div className="header-area p-0">
              <div className="container-fluid">
                <div className="row align-items-center">
                  <div className="ml-4 pl-3">
                    <div
                      onClick={this.togglePull}
                      className="nav-btn pull-left my-auto"
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="col p-0">
                    <div className="user-profile pull-right m-0">
                      <img
                        className="avatar user-thumb"
                        src="assets/images/author/avatar.png"
                        alt="avatar"
                      />
                      <h4
                        className="user-name dropdown-toggle my-auto"
                        onClick={this.handleClick}
                      >
                        Kumkum Rai <i className="fa fa-angle-down"></i>
                      </h4>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href="/">
                          Message
                        </a>
                        <a className="dropdown-item" href="/">
                          Settings
                        </a>
                        <a className="dropdown-item" href="/logout">
                          Log Out
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Navigation {...this.props.navigationLink} />
            </div>
            <div className="main-content-inner">{this.props.children}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Navbar;
