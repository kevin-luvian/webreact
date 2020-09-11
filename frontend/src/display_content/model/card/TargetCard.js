import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";

class TargetCard extends Component {
  isTargetReached = () => {
    return this.props.value - this.props.currentAmount <= 0;
  };

  getCurrentPercentage = () => {
    const currentPercentage =
      (this.props.value <= 0) | this.isTargetReached()
        ? 100
        : (this.props.currentAmount / this.props.value) * 100;
    return currentPercentage + "%";
  };

  getRaisedAmount = () => {
    return this.props.currentAmount;
  };

  render() {
    return (
      <div
        className="shadow mb-4"
        style={{
          borderRadius: "0.5rem",
          backgroundColor: "white",
          width: "100%",
          padding: "1.5rem 1rem",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 pl-2">
              <div className="row m-0">
                <p
                  className="hover-shadow"
                  style={{
                    fontSize: "0.8rem",
                    borderRadius: "1rem",
                    width: "max-content",
                    margin: "0",
                    padding: "5px 15px",
                    color: "white",
                    backgroundColor: this.props.categoryModel.color,
                  }}
                >
                  {this.props.name}
                </p>
                <div
                  className="hover-shadow"
                  style={{
                    display: "flex",
                    height: "30px",
                    padding: "0 0.5rem",
                    marginLeft: "0.5rem",
                    borderRadius: "1rem",
                    backgroundColor: this.props.accountModel.color,
                  }}
                >
                  <i
                    className={"fa fa-" + this.props.accountModel.favIcon}
                    style={{
                      fontSize: "0.9rem",
                      margin: "0px 5px",
                      color: "white",
                      transform: "translateY(25%)",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "0.8rem",
                      borderRadius: "0 1rem 1rem 0",
                      width: "max-content",
                      height: "30px",
                      margin: "0px 5px 0px 0px",
                      padding: "5px 0px",
                      color: "white",
                    }}
                  >
                    {this.props.accountModel.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 text-right pr-2">
              <div
                className="btn-target px-3"
                style={{ backgroundColor: this.props.categoryModel.color }}
              >
                <Tooltip title="add transaction" arrow>
                  <i
                    className="fa fa-plus"
                    style={{
                      color: "white",
                      transform: "translateY(20%)",
                    }}
                    onClick={this.props.onAdd}
                  />
                </Tooltip>
                <Tooltip title="edit" arrow>
                  <i
                    className="fa fa-edit mx-3"
                    style={{
                      color: "white",
                      transform: "translateY(20%)",
                    }}
                    onClick={this.props.onEdit}
                  />
                </Tooltip>
                <Tooltip title="delete" arrow>
                  <i
                    className="fa fa-trash"
                    style={{
                      color: "white",
                      transform: "translateY(15%)",
                    }}
                    onClick={this.props.onDelete}
                  />
                </Tooltip>
              </div>
              {this.isTargetReached() && (
                <div
                  className="btn-target px-1 ml-1"
                  style={{ backgroundColor: "#4caf50" }}
                >
                  <Tooltip title="end target" arrow>
                    <i
                      className="fa fa-check"
                      style={{
                        color: "white",
                        transform: "translateY(20%)",
                      }}
                      onClick={this.props.onEnd}
                    />
                  </Tooltip>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="container mt-3">
          <div
            style={{
              borderRadius: "1rem",
              backgroundColor: "lightgray",
              height: "10px",
            }}
          >
            <div
              style={{
                borderRadius: "1rem",
                backgroundColor: this.props.categoryModel.color,
                width: this.getCurrentPercentage(),
                height: "100%",
              }}
            />
          </div>
        </div>
        <div className="container mt-2">
          <p className="m-0">
            <b style={{ color: this.props.categoryModel.color }}>
              Rp {this.getRaisedAmount()} raised
            </b>
            <span style={{ color: "#7a7a7a", fontSize: "0.9rem" }}>
              {" "}
              of Rp {this.props.value}
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default TargetCard;
