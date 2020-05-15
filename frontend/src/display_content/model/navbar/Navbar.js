import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "./sidebar/Sidebar";
import Navigation from "./Navigation";
import DropdownMenu from "./DropdownMenu";
import $ from "jquery";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuTimeout: null,
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
      menuTimeout: setTimeout(function () {
        if ($(".dropdown-menu").css("display") === "block") {
          $(".dropdown-menu").slideToggle(300);
        }
      }, 5000),
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
                    <DropdownMenu username={this.props.user.username}/>
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

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Navbar);
