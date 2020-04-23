import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Element from "./Element";

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
          { text: "summary", href: "/summary-dashboard" },
        ],
      },
      {
        title: "Account",
        href: "/account",
        icon: "fa fa-money",
      },
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
              <div>
                <img src="assets/images/icon/logo512.png" alt="logo" />
              </div>
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
