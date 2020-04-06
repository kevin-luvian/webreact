import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Element from "./Element";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createElements = () => {
    var elements = [
      {
        title: "Dashboard",
        href: "#",
        icon: "fa fa-dashboard",
        subtitles: [
          { text: "today", href: "/" },
          { text: "weekly", href: "/week-dashboard" },
          { text: "monthly", href: "/month-dashboard" },
          { text: "summary", href: "/summary-dashboard" }
        ]
      },
      {
        title: "Account",
        href: "/account",
        icon: "fa fa-money"
      },
      {
        title: "Logout",
        href: "#",
        icon: "fa fa-power-off"
      }
    ];

    let result = [];
    elements.map((props, index) =>
      result.push(<Element key={index} index={index} {...props} />)
    );
    return result;
  };

  render() {
    return (
      <React.Fragment>
        <div className="sidebar-menu">
          <div className="sidebar-header">
            <div className="logo">
              <Link to="/">
                <img src="assets/images/icon/logo.png" alt="logo" />
              </Link>
            </div>
          </div>
          <div className="main-menu">
            <div className="menu-inner">
              <nav>
                <ul className="metismenu" id="menu">
                  {this.createElements()}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Sidebar;
