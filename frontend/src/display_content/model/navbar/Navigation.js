import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div
          className="page-title-area"
          style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 0.15rem .7rem" }}
        >
          <div className="row align-items-center py-3">
            <div className="col-sm-6">
              <div className="breadcrumbs-area clearfix">
                <h4 className="page-title pull-left my-auto">
                  {this.props.title}
                </h4>
                <ul className="breadcrumbs pull-left mb-0">
                  {this.props.history.map((value, index) => {
                    return (
                      <li key={index}>
                        {value.href === "" ? (
                          <span>{value.title}</span>
                        ) : (
                          <Link to={value.href}>{value.title}</Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Navigation;
