import React, { Component } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import Chart from "chart.js";
import Color from "color";

class TodayPie extends Component {
  constructor(props) {
    super(props);
    this.state = { pieChart: {} };
  }

  componentDidMount() {
    this.loadChartNew();
  }

  reload = () => {
    this.state.pieChart.destroy();
    this.loadChartNew();
  };

  parseData = () => {
    let data = this.props.data;
    var res = {};
    for (let i = 0; i < data.length; i++) {
      let value_clone = data[i].value;
      if (!data[i].type) value_clone *= -1;
      if (data[i].categoryModel.name in res) {
        res[data[i].categoryModel.name].total += value_clone;
      } else {
        res[data[i].categoryModel.name] = {
          total: value_clone,
          color: data[i].categoryModel.color,
        };
      }
    }
    return res;
  };

  parseDataToArray = (dataset) => {
    const res = { labels: [], colors: [], colorsDarken: [], totals: [] };
    for (const key in dataset) {
      res.labels.push(key);
      res.colors.push(dataset[key].color);
      res.colorsDarken.push(Color(dataset[key].color).darken(0.2).hex());
      res.totals.push(dataset[key].total);
    }
    return res;
  };

  loadChartNew = () => {
    let parsedData = this.parseData();
    let dataArr = this.parseDataToArray(parsedData);
    var data = {
      labels: dataArr.labels,
      datasets: [
        {
          fill: true,
          backgroundColor: dataArr.colors,
          hoverBackgroundColor: dataArr.colorsDarken,
          data: dataArr.totals,
          borderColor: Array(dataArr.colors.length).fill("white"),
          borderWidth: [2, 2],
        },
      ],
    };
    var options = {
      title: {
        display: true,
        position: "top",
      },
      rotation: -0.7 * Math.PI,
      animation: { animateScale: true },
      // rotation: 0,
    };
    var myDoughnutChart = new Chart("piechart", {
      type: "doughnut",
      data: data,
      options: options,
    });

    this.setState({
      pieChart: myDoughnutChart,
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.isLoading ? (
          <div className="card shadow" style={{ minHeight: "478px" }}>
            <div className="center mx-auto">
              <ScaleLoader color={"#8914fe"} height={70} width={5} margin={5} />
              <div className="d-none" id="highpiechart" />
            </div>
          </div>
        ) : (
          <div className="card shadow">
            <div className="card-body">
              <h4 className="header-title">Today Expenses</h4>
              <div style={{overflowX:"auto"}}>
              <canvas
                id="piechart"
                style={{ minWidth: "300px", minHeight: "170px" }}
              /></div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default TodayPie;
