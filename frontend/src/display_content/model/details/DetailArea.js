import React, { Component } from "react";
import DetailElement from "./DetailElement";
import $ from "jquery";

class DetailArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.processData()
    };
  }

  processData = () => {
    var transactions = this.props.data;
    var total = 0;
    var categories = this.getCategoryTemplate();

    for (var i = 0; i < transactions.length; i++) {
      let transaction_clone = JSON.parse(JSON.stringify(transactions[i]));
      if (!transaction_clone.type) transaction_clone.value *= -1;
      total += transaction_clone.value;
      categories[transaction_clone.category.title].count += 1;
      categories[transaction_clone.category.title].total += transaction_clone.value;
    }

    return {
      count: transactions.length,
      total: total,
      category_data: categories
    };
  };

  getCategoryTemplate = () => {
    var categories = [
      { title: "Food", color: "crimson" },
      { title: "Beverage", color: "grey" },
      { title: "Utility", color: "cornflowerblue" }
    ];
    var res = {};
    for (var i = 0; i < categories.length; i++) {
      categories[i]["count"] = 0;
      categories[i]["total"] = 0;
      res[categories[i].title] = categories[i];
    }
    return res;
  };

  handleChangeDay = day => {
    this.setState({
      data: this.processData(day)
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
    $("#target-detail-body").slideToggle(300, function() {
      $("#target-detail-body").toggleClass("collapse");
    });
  };

  renderTotal = () => {
    var res = [];
    var total = this.state.data.total;
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
        <div className="col-12">
          <div
            id="detail-head"
            className="card p-3 shadow"
            onClick={this.handleClick}
          >
            <div className="row">
              <div className="col">
                <h4 class="header-title mb-2">Summary</h4>
                <p className="color-mygray m-0">
                  count
                  <span style={{ display: "inline-block", width: "10px" }} />
                  {this.state.data.count}
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
                    right: "20%"
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-12 collapse" id="target-detail-body">
            <div className="row mt-4">
              {this.iterateOver(this.state.data.category_data, (key, value) => {
                return <DetailElement key={key} {...value} />;
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DetailArea;
