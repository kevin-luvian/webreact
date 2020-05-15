import React, { Component } from "react";
import DetailElement from "./DetailElement";
import ScaleLoader from "react-spinners/ScaleLoader";
import $ from "jquery";

class DetailArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      total: 0,
      categories: [],
    };
  }

  componentDidMount() {
    this.processData();
  }

  processData = () => {
    var transactions = this.props.data;
    var total = 0;
    var categories = this.getCategoryTemplate();

    try {
      for (var i = 0; i < transactions.length; i++) {
        let transaction_clone = JSON.parse(JSON.stringify(transactions[i]));
        if (!transaction_clone.type) transaction_clone.value *= -1;
        total += transaction_clone.value;
        categories[transaction_clone.categoryModel.name].count += 1;
        categories[transaction_clone.categoryModel.name].total +=
          transaction_clone.value;
      }
    } catch (err) {
      console.log(err.message);
    }

    this.setState({
      count: transactions.length,
      total: total,
      categories: categories,
    });
  };

  getCategoryTemplate = () => {
    var res = {};
    for (var i = 0; i < this.props.categories.length; i++) {
      this.props.categories[i]["count"] = 0;
      this.props.categories[i]["total"] = 0;
      res[this.props.categories[i].name] = this.props.categories[i];
    }
    return res;
  };

  handleChangeDay = (day) => {
    this.setState({
      data: this.processData(day),
    });
  };

  iterateOver(data, func) {
    return Object.keys(data).map((key, idx) => {
      return func(key, data[key], idx);
    });
  }

  handleClick = () => {
    $("#detail-dropdown-icon").toggleClass("fa-angle-double-down");
    $("#detail-dropdown-icon").toggleClass("fa-angle-double-up");
    $("#target-detail-body").slideToggle(300, function () {
      $("#target-detail-body").toggleClass("collapse");
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
            style={{ fontSize: "10px" }}
          />
        </span>
      );
    } else {
      return (
        <span key={0}>
          Rp {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      );
    }
  };

  render() {
    return (
      <div className="col-12">
        {this.props.isLoading ? (
          <div className="card shadow" style={{ minHeight: "108px" }}>
            <div className="center mx-auto">
              <ScaleLoader color={"#8914fe"} height={50} width={5} margin={5} />
            </div>
          </div>
        ) : (
          <React.Fragment>
            <div
              id="detail-head"
              className="card p-3 shadow"
              onClick={this.handleClick}
            >
              <div className="row">
                <div className="col">
                  <h4 className="header-title mb-2">Summary</h4>
                  <p className="color-mygray m-0">
                    count
                    <span style={{ display: "inline-block", width: "10px" }} />
                    {this.state.count}
                  </p>
                  <p className="color-mygray m-0">
                    total
                    <span style={{ display: "inline-block", width: "16px" }} />
                    {this.renderTotal()}
                  </p>
                </div>
                <div className="col-2 float-right">
                  <i
                    id="detail-dropdown-icon"
                    className="fa fa-2x fa-angle-double-down"
                    style={{
                      position: "absolute",
                      transform: "translateY(-50%)",
                      top: "50%",
                      right: "20%",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 collapse" id="target-detail-body">
              <div className="row mt-4">
                {this.iterateOver(this.state.categories, (key, value) => {
                  return <DetailElement key={key} {...value} />;
                })}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default DetailArea;
