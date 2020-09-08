import React, { Component } from "react";

class TargetCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Drone Mk.II",
      amount: { current: 500000, target: 5000000 },
      account: { name: "card", color: "orange", icon: "fa fa-plus" },
      category: { name: "food", color: "crimson" },
    };
  }

  getCurrentPercentage = () => {
    const currentPercentage =
      (this.state.amount.current / this.state.amount.target) * 100;
    return currentPercentage + "%";
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
            <div className="col-9 pl-2">
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
                    backgroundColor: this.state.category.color,
                  }}
                >
                  {this.state.title}
                </p>
                <div
                  className="hover-shadow"
                  style={{
                    display: "flex",
                    height: "30px",
                    padding: "0 0.5rem",
                    marginLeft: "0.5rem",
                    borderRadius: "1rem",
                    backgroundColor: this.state.account.color,
                  }}
                >
                  <i
                    className={this.state.account.icon}
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
                    {this.state.account.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-3 text-right pr-2">
              <div
                className="btn-target px-3"
                style={{ backgroundColor: this.state.category.color }}
              >
                <i
                  className="fa fa-plus"
                  style={{
                    color: "white",
                    transform: "translateY(20%)",
                  }}
                  onClick={this.props.onAdd}
                />
                <i
                  className="fa fa-edit mx-3"
                  style={{
                    color: "white",
                    transform: "translateY(20%)",
                  }}
                  onClick={this.props.onEdit}
                />
                <i
                  className="fa fa-trash"
                  style={{
                    color: "white",
                    transform: "translateY(15%)",
                  }}
                />
              </div>
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
                backgroundColor: this.state.category.color,
                width: this.getCurrentPercentage(),
                height: "100%",
              }}
            />
          </div>
        </div>
        <div className="container mt-2">
          <p className="m-0">
            <b style={{ color: this.state.category.color }}>
              Rp {this.state.amount.target - this.state.amount.current} remained
            </b>
            <span style={{ color: "#7a7a7a", fontSize: "0.9rem" }}>
              {" "}
              of Rp {this.state.amount.target}
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default TargetCard;
