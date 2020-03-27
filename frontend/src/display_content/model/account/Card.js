import React, { Component } from "react";

class Card2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div className="col-xl-3 col-md-4 col-sm-6 mt-4">
          <div
            className="card-border-ry-none shadow h-100 py-2"
            style={{ borderLeft: ".25rem solid " + this.props.color }}
          >
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div
                    className="text-xs font-weight-bold text-uppercase mb-1"
                    style={{ color: this.props.color }}
                  >
                    {this.props.title}
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    Rp {this.props.total}
                  </div>
                </div>
                <div className="col-auto mr-3">
                  <i className={this.props.icon + " fa-2x text-gray-300"}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Card2;
