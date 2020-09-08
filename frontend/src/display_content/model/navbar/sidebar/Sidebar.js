import React, { Component } from "react";
import { connect } from "react-redux";
import Element from "./Element";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createElements = () => {
    let elements = [
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
        title: "Target",
        href: "/target",
        icon: "fa fa-tags",
      },
      {
        title: "Account",
        href: "/account",
        icon: "fa fa-money",
      },
    ];

    if (this.props.user.roles.includes("ROLE_ADMIN")) {
      elements.push({
        title: "Users",
        href: "/user-management",
        icon: "fa fa-users",
      });
    }

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

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Sidebar);
