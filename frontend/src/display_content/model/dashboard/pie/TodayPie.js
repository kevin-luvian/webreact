import React, { Component } from "react";

class TodayPie extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.loadChart();
  }

  parseData = () => {
    let data = this.props.data;
    var res = {};
    for (let i = 0; i < data.length; i++) {
      let value_clone = data[i].value;
      if (!data[i].type) value_clone *= -1;
      if (data[i].category.title in res) {
        res[data[i].category.title].total += value_clone;
      } else {
        res[data[i].category.title] = {
          total: value_clone,
          color: data[i].category.color
        };
      }
    }
    return res;
  };

  getTotalExpense = data => {
    let total = 0;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        let value = data[key].total;
        if (value > 0) total += value;
      }
    }
    return total;
  };

  parseDetailData = data => {
    let percentageData = [];
    let colors = [];
    let total = this.getTotalExpense(data);
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        let value = data[key].total;
        if (data[key].total > 0)
          if (value > 0) {
            colors.push(data[key].color);
            percentageData.push({
              name: key,
              y: value / total
            });
          }
      }
    }
    return { colors: colors, percentageData: percentageData };
  };

  loadChart = () => {
    let parsedData = this.parseData();
    let details = this.parseDetailData(parsedData);

    var Highcharts = require("highcharts");

    Highcharts.chart("highpiechart", {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
        height: "400px"
      },
      title: {
        text: ""
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          size: "100%",
          cursor: "pointer",
          colors: details.colors,
          dataLabels: {
            style: {
              color: "contrast",
              fontSize: "11px",
              fontWeight: "bold",
              textOutline: ""
            },
            enabled: true,
            format: "<b>{point.name}</b><br>{point.percentage:.1f} %",
            distance: -50,
            filter: {
              property: "percentage",
              operator: ">",
              value: 4
            }
          }
        }
      },
      series: [
        {
          name: "Share",
          data: details.percentageData
        }
      ]
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="card shadow">
          <div className="card-body">
            <h4 className="header-title">Today Expenses</h4>
            <div id="highpiechart"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TodayPie;
