import React, { Component } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";
import Chart from "chart.js";

const modes = ["normal", "cumulative"];

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "normal",
      lineChart: {}
    };
  }

  componentDidMount() {
    this.loadChart();
  }

  handleModeChange = e => {
    this.setState(
      {
        mode: e.target.value
      },
      () => {
        this.state.lineChart.destroy();
        this.loadChart();
      }
    );
  };

  parseLabel = data => {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      res.push(data[i].day);
    }
    return res;
  };

  parseValue = (mode, data) => {
    var res = [];
    var cumulative = 0;
    for (var i = 0; i < data.length; i++) {
      var temp_total = 0;
      for (var j = 0; j < data[i].transactions.length; j++) {
        let transaction_clone = JSON.parse(JSON.stringify(data[i].transactions[j]));
        if(!transaction_clone.type) transaction_clone.value *= -1
        temp_total += transaction_clone.value;
      }
      if (mode === "cumulative") {
        temp_total += cumulative;
        cumulative = temp_total;
      }
      res.push(temp_total);
    }
    return res;
  };

  parseToK = value => {
    return value % 1000;
  };

  loadChart = () => {
    var data = this.props.data;
    var mode = this.state.mode;
    this.setState({
      lineChart: new Chart("lineChart", {
        type: "line",
        data: {
          labels: this.parseLabel(data),
          datasets: [
            {
              label: "Total",
              lineTension: 0.3,
              backgroundColor: "rgba(78, 115, 223, 0.05)",
              borderColor: "rgba(78, 115, 223, 1)",
              pointRadius: 3,
              pointBackgroundColor: "rgba(78, 115, 223, 1)",
              pointBorderColor: "rgba(78, 115, 223, 1)",
              pointHoverRadius: 3,
              pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
              pointHoverBorderColor: "rgba(78, 115, 223, 1)",
              pointHitRadius: 10,
              pointBorderWidth: 2,
              data: this.parseValue(mode, data)
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 10,
              right: 25,
              top: 25,
              bottom: 0
            }
          },
          scales: {
            xAxes: [
              {
                time: {
                  unit: "date"
                },
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                ticks: {
                  maxTicksLimit: 7
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  maxTicksLimit: 5,
                  padding: 10,
                  // Include a dollar sign in the ticks
                  callback: function(value, index, values) {
                    return "Rp " + value / 1000 + "K";
                  }
                },
                gridLines: {
                  color: "rgb(234, 236, 244)",
                  zeroLineColor: "rgb(234, 236, 244)",
                  drawBorder: false,
                  borderDash: [2],
                  zeroLineBorderDash: [2]
                }
              }
            ]
          },
          legend: {
            display: false
          },
          tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            titleMarginBottom: 10,
            titleFontColor: "#6e707e",
            titleFontSize: 14,
            borderColor: "#dddfeb",
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            intersect: false,
            mode: "index",
            caretPadding: 10,
            callbacks: {
              label: function(tooltipItem, chart) {
                var datasetLabel =
                  chart.datasets[tooltipItem.datasetIndex].label || "";
                return (
                  datasetLabel +
                  ": Rp " +
                  tooltipItem.yLabel
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                );
              }
            }
          }
        }
      })
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="col">
          <div className="card shadow">
            <div class="card-body">
              <div className="row">
                <div className="col">
                  <h4 className="header-title mb-0">The Weekly Expenses</h4>
                </div>
                <div className="col-12 col-sm-5 col-md-4 my-4 my-sm-0">
                  <FormControl variant="outlined" className="w-100 my-auto">
                    <InputLabel>mode</InputLabel>
                    <Select
                      value={this.state.mode}
                      onChange={this.handleModeChange}
                      label="mode"
                    >
                      {modes.map((value, index) => {
                        return (
                          <MenuItem key={index} value={value}>
                            {value}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="">
                <canvas id="lineChart" style={{ height: "300px" }}></canvas>
              </div>
              <hr />
              Styling for the area chart can be found in the{" "}
              <code>/js/demo/chart-area-demo.js</code> file.
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LineChart;
