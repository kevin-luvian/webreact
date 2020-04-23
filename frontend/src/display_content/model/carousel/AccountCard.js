import React, { Component } from "react";
import $ from "jquery";

class AccountCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
    };
  }

  createKey = (key) => {
    return this.props.id + "-" + key;
  };

  handleButtonClick = () => {
    this.props.handleClick(this.props.id);
  };

  handleClick = () => {
    this.setState({ isClicked: true });
  };

  handleHoverIn = () => {
    $("#" + this.createKey("card")).css("background-color", this.props.color);
    $("#" + this.createKey("card-body")).addClass("d-none");
    $("#" + this.createKey("card")).addClass("account-card-carousel-hover");
    $("#" + this.createKey("card-body")).removeClass("account-card-carousel");
    $("#" + this.createKey("btn-click")).removeClass("d-none");
  };

  handleHoverOut = () => {
    $("#" + this.createKey("card")).css("background-color", "white");
    $("#" + this.createKey("card")).addClass("account-card-carousel");
    $("#" + this.createKey("card-body")).removeClass("d-none");
    $("#" + this.createKey("card")).removeClass("account-card-carousel-hover");
    $("#" + this.createKey("btn-click")).addClass("d-none");
  };

  renderTotal = (total) => {
    if (total < 0) {
      return (
        <React.Fragment>
          Rp {total * -1} <i className="fa fa-arrow-up icon-arrow-up" />
        </React.Fragment>
      );
    }
    return "Rp " + total;
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-10 col-sm-7 mx-auto">
          <div
            id={this.createKey("card")}
            className="card-border-ry-none shadow py-2"
            style={{ borderLeft: ".25rem solid " + this.props.color }}
            onClick={this.handleClick}
            onMouseEnter={this.handleHoverIn}
            onMouseLeave={this.handleHoverOut}
          >
            <div
              id={this.createKey("btn-click")}
              className="text-center d-none"
              style={{ paddingTop: "6px" }}
            >
              <i
                className="account-card-icon fa fa-file"
                onClick={this.handleButtonClick}
              />
            </div>
            <div id={this.createKey("card-body")} className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div
                    className="text-xs font-weight-bold text-uppercase mb-1"
                    style={{ color: this.props.color }}
                  >
                    {this.props.name}
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {this.renderTotal(this.props.total)}
                  </div>
                </div>
                <div className="col-auto mr-3">
                  <i
                    className={
                      "fa fa-2x text-gray-300 fa-" + this.props.favIcon
                    }
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AccountCard;
