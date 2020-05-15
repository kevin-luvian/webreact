import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

class DropdownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuTimeout: null,
    };
  }

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
    const dropdownMenus = [
      { title: "Message", link: "/message" },
      { title: "Settings", link: "/settings" },
      { title: "Logout", link: "/logout" },
    ];
    return (
      <React.Fragment>
        <div
          className="user-profile pull-right m-0"
          style={{ minWidth: "220px" }}
        >
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
              {this.props.username} <i className="fa fa-angle-down"></i>
            </h4>
            <div className="dropdown-menu">
              {dropdownMenus.map((menu, index) => {
                return (
                  <Link key={index} className="dropdown-item" to={menu.link}>
                    {menu.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DropdownMenu;
