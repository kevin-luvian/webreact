import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import $ from "jquery";

class Element extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getIdUl = () => {
    return "sidebar-ul-toggle-" + this.props.index;
  };

  getIdElement = () => {
    return "sidebar-element-toggle-" + this.props.index;
  };

  handleClick = event => {
    $("#" + this.getIdElement()).slideToggle(500);
    event.preventDefault();
  };

  handleMouseEnter = () => {
    $("#" + this.getIdUl()).attr("style", "color: white !important");
  };

  handleMouseLeave = () => {
    $("#" + this.getIdUl()).css("color", "");
  };

  render() {
    return (
      <React.Fragment>
        {this.props.subtitles ? (
          <li>
            <a
              href="/#"
              id={this.getIdUl()}
              className="no-link-sidebar"
              onClick={this.handleClick}
            >
              <i className={this.props.icon}></i>
              <span>{this.props.title}</span>
            </a>
            <ul
              id={this.getIdElement()}
              style={{ display: "none" }}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            >
              {this.props.subtitles.map((subtitle, i) => (
                <li className="" key={i} style={{ listStyleType: "none" }}>
                  <Link to={subtitle.href} style={{ textDecoration: "none" }}>
                    {subtitle.text}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ) : (
          <li>
            <Link to={this.props.href} className="no-link-sidebar">
              <i className={this.props.icon}></i>
              <span>{this.props.title}</span>
            </Link>
          </li>
        )}
      </React.Fragment>
    );
  }
}

export default Element;
