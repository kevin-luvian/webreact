import React, { Component } from "react";

class GraphDetailElement extends Component {
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
        <div className="col-md-6 mt-2 px-1">
          <div className="card shadow">
            <div className="card-body">
              <h4
                className="header-title mb-2"
                style={{ color: this.props.color }}
              >
                {this.props.title}
              </h4>
              <p className="color-mylightgray m-0">
                count
                <span style={{ display: "inline-block", width: "10px" }}></span>
                {this.props.count}
              </p>
              <p className="color-mylightgray m-0">
                total
                <span style={{ display: "inline-block", width: "16px" }}></span>
                {this.renderTotal()}
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GraphDetailElement;
