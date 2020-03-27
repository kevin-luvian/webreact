import React, { Component } from "react";
import GraphDetailElement from "./GraphDetailElement";

class GraphDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { details_data: [], total: 0, count: 0 };
  }

  componentDidMount() {
    let parsedData = this.parseData();
    this.setState({
      details_data: parsedData.data,
      total: parsedData.total,
      count: parsedData.count
    });
  }

  convertToArray = data => {
    let res = [];

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        res.push({
          title: key,
          color: data[key].color,
          count: data[key].count,
          total: data[key].total
        });
      }
    }
    return res;
  };

  parseData = () => {
    let data = this.props.data;
    let res = {};
    let total = 0;
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      let value_clone = data[i].value;
      if (!data[i].type) value_clone *= -1;
      total += value_clone;
      count += 1;
      if (data[i].category.title in res) {
        res[data[i].category.title].total += value_clone;
        res[data[i].category.title].count += 1;
      } else {
        res[data[i].category.title] = {
          total: value_clone,
          color: data[i].category.color,
          count: 1
        };
      }
    }
    return { total: total, count: count, data: this.convertToArray(res) };
  };

  renderTotal = () => {
    var res = [];
    var total = this.state.total;
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

  createDetailCards = () => {
    let result = [];
    this.state.details_data.map((props, index) =>
      result.push(<GraphDetailElement key={index} {...props} />)
    );
    return result;
  };

  render() {
    return (
      <React.Fragment>
        <div
          className="card shadow bg-myblue mt-phone-4"
          style={{ border: "none" }}
        >
          <div className="card-body">
            <h4 className="header-title text-white">Details</h4>
            <div className="row">
              <div className="col">
                <p className="text-white m-0">
                  Total
                  <span
                    style={{ display: "inline-block", width: "10px" }}
                  ></span>
                  <span className="font-weight-bold">{this.renderTotal()}</span>
                </p>
              </div>
              <div className="col">
                <p className="text-white m-0 float-right">
                  Count
                  <span
                    style={{ display: "inline-block", width: "10px" }}
                  ></span>
                  <span className="font-weight-bold">{this.state.count}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row px-3">{this.createDetailCards()}</div>
      </React.Fragment>
    );
  }
}

export default GraphDetail;
