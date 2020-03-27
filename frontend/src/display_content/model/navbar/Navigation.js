import React, { Component } from "react";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-title-area">
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
                          <a href={value.href}>{value.title}</a>
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
