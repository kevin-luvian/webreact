import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Sidebar from "./sidebar/Sidebar";
import Navigation from "./Navigation";
import $ from "jquery";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuTimeout: null,
      name: "Mr Panjoel"
    };
  }

  togglePull = () => {
    $(".page-container").toggleClass("sbar");
    $(".page-container").toggleClass("sbar_collapsed");
  };

  handleClick = () => {
    $(".dropdown-menu").slideToggle(300);
    clearTimeout(this.state.menuTimeout);
    this.setState({
      menuTimeout: setTimeout(function() {
        if ($(".dropdown-menu").css("display") === "block") {
          $(".dropdown-menu").slideToggle(300);
        }
      }, 5000)
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-container sbar_collapsed" id="page-container">
          <Sidebar />
          <div className="main-content">
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
                    <div className="user-profile pull-right m-0"style={{ minWidth: "220px" }}>
                      <div className="row mx-auto">
                        <img
                          className="avatar user-thumb"
                          src="assets/images/author/avatar.png"
                          alt="avatar"
                        />
                        <h4
                          className="user-name dropdown-toggle my-auto"
                          onClick={this.handleClick}
                        >
                          {this.props.username}{" "}
                          <i className="fa fa-angle-down"></i>
                        </h4>
                        <div className="dropdown-menu">
                          <Link className="dropdown-item" to="/">
                            Message
                          </Link>
                          <Link className="dropdown-item" to="/settings">
                            Settings
                          </Link>
                          <Link className="dropdown-item" to="/logout">
                            Log Out
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Navigation {...this.props.navigationLink} />
            </div>
            <div className="main-content-inner pb-3">{this.props.children}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(Navbar);
