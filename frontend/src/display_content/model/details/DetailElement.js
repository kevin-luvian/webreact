import React, { Component } from "react";

class DetailElement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderTotal = () => {
    var res = [];
    var total = this.props.total;
    if (total < 0) {
      total *= -1;
      res.push(
        <span key={0} style={{ color: "#08d467" }}>
          Rp {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      );
    } else {
      res.push(
        <span key={0}>
          Rp {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      );
    }
    return res;
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-12 col-sm-6 col-md-4 mb-3">
          <div
            className="card-border-ry-none shadow"
            style={{ borderLeft: ".25rem solid " + this.props.color }}
          >
            <div className="card-body p-3">
              <p
                className="header-title mb-0"
                style={{ color: this.props.color }}
              >
                {this.props.title}
              </p>
              <p className="color-mygray m-0">
                count
                <span style={{ display: "inline-block", width: "10px" }}></span>
                {this.props.count}
              </p>
              <p className="color-mygray m-0">
                total
                <span
                  style={{ display: "inline-block", width: "16px" }}
                ></span>{" "}
                {this.renderTotal()}
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DetailElement;
