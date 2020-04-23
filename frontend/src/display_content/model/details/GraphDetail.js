import React, { Component } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import GraphDetailElement from "./GraphDetailElement";

class GraphDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { details_data: [], total: 0, count: 0 };
  }

  componentDidMount() {
    this.parseData();
  }

  convertToArray = (data) => {
    let res = [];

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        res.push({
          title: key,
          color: data[key].color,
          count: data[key].count,
          total: data[key].total,
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
      if (data[i].categoryModel.name in res) {
        res[data[i].categoryModel.name].total += value_clone;
        res[data[i].categoryModel.name].count += 1;
      } else {
        res[data[i].categoryModel.name] = {
          total: value_clone,
          color: data[i].categoryModel.color,
          count: 1,
        };
      }
    }

    this.setState({
      details_data: this.convertToArray(res),
      total: total,
      count: count,
    });
  };

  renderTotal = () => {
    var total = this.state.total;
    if (total < 0) {
      total *= -1;
      return (
        <span>
          Rp {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          <i
            className="fa fa-arrow-up icon-arrow-up"
            style={{ fontSize: "10px", color: "white" }}
          />
        </span>
      );
    } else {
      return (
        <span>Rp {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
      );
    }
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
        {this.props.isLoading ? (
          <div
            className="card shadow bg-myblue mt-phone-4"
            style={{ minHeight: "102px" }}
          >
            <div className="center mx-auto">
              <ScaleLoader color={"white"} height={50} width={5} margin={5} />
            </div>
          </div>
        ) : (
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
                      <span className="">{this.renderTotal()}</span>
                    </p>
                  </div>
                  <div className="col">
                    <p className="text-white m-0 float-right">
                      Count
                      <span
                        style={{ display: "inline-block", width: "10px" }}
                      ></span>
                      <span className="">{this.state.count}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row px-3">{this.createDetailCards()}</div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default GraphDetail;
