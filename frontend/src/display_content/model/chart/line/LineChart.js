import React, { Component } from "react";
import {
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Checkbox,
  FormControl,
  FormControlLabel
} from "@material-ui/core";
import { parseDayFromDate } from "../../../../backend/function/Function";
import ScaleLoader from "react-spinners/ScaleLoader";
import Chart from "chart.js";

const modes = ["normal", "cumulative"];

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "normal",
      incomeAsPositiveChecked: false,
      incomeChecked: true,
      expenseChecked: true,
      startDate: this.props.startDate,
      lineChart: {}
    };
  }

  componentDidMount() {
    if (!this.props.isLoading) this.loadChart();
    //console.log(this.parseData("normal", this.props.data));
  }

  reload = () => {
    this.state.lineChart.destroy();
    this.loadChart();
  };

  handleModeChange = e => {
    this.setState({ mode: e.target.value }, this.reload);
  };

  toggleIncomeAsPositiveChecked = () => {
    this.setState(
      { incomeAsPositiveChecked: !this.state.incomeAsPositiveChecked },
      this.reload
    );
  };

  toggleIncomeChecked = () => {
    this.setState({ incomeChecked: !this.state.incomeChecked }, this.reload);
  };

  toggleExpenseChecked = () => {
    this.setState({ expenseChecked: !this.state.expenseChecked }, this.reload);
  };

  parseData = () => {
    let transactions = this.props.data;
    var res = [];
    var cumulative = 0;
    let dateArr = this.getDateArr();

    for (let i = 0; i < dateArr.length; i++) {
      let tempTotal = 0;
      for (let j = 0; j < transactions.length; j++) {
        if (transactions[j].date === dateArr[i]) {
          if (this.state.incomeChecked && !transactions[j].type) {
            tempTotal += transactions[j].value * -1;
          } else if (this.state.expenseChecked && transactions[j].type) {
            tempTotal += transactions[j].value;
          }
        }
      }
      if (this.state.incomeAsPositiveChecked) {
        tempTotal = tempTotal * -1;
      }
      if (this.state.mode === "cumulative") {
        tempTotal += cumulative;
        cumulative = tempTotal;
      }
      res.push(tempTotal);
    }

    return res;
  };

  getDateArr = () => {
    let date = new Date(this.state.startDate);
    let res = [this.parseDate(date)];
    for (let i = 0; i < 6; i++) {
      date.setDate(date.getDate() + 1);
      res.push(this.parseDate(date));
    }
    return res;
  };

  getDateToStringArr = () => {
    let date = new Date(this.state.startDate);
    let res = [parseDayFromDate(date)];
    for (let i = 0; i < 6; i++) {
      date.setDate(date.getDate() + 1);
      res.push(parseDayFromDate(date));
    }
    return res;
  };

  parseDate = date_param => {
    return [
      date_param.getFullYear(),
      ("0" + (date_param.getMonth() + 1)).slice(-2),
      ("0" + date_param.getDate()).slice(-2)
    ].join("-");
  };

  parseToK = value => {
    return value % 1000;
  };

  loadChart = () => {
    this.setState({
      lineChart: new Chart("lineChart", {
        type: "line",
        data: {
          labels: this.getDateToStringArr(),
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
              data: this.parseData()
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
                  callback: function(value, index, values) {
                    return (
                      (value / 1000)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " K"
                    );
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
          {this.props.isLoading ? (
            <div className="card shadow" style={{ minHeight: "453px" }}>
              <div className="center mx-auto">
                <ScaleLoader
                  color={"#8914fe"}
                  height={70}
                  width={5}
                  margin={5}
                />
              </div>
            </div>
          ) : (
            <div className="card shadow">
              <div className="card-body">
                <div className="row justify-content-end">
                  <div className="col-12 col-sm-6 col-md-5 mt-4 my-sm-0">
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
                  <canvas id="lineChart" style={{ height: "300px" }} />
                </div>
                <hr />
                <div className="row ">
                  <div className="col">
                    <small
                      style={{
                        color: "rgba(0, 0, 0, 0.54)"
                      }}
                    >
                      incomes
                    </small>
                    <Checkbox
                      checked={this.state.incomeChecked}
                      onChange={this.toggleIncomeChecked}
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                    <small
                      style={{
                        color: "rgba(0, 0, 0, 0.54)"
                      }}
                    >
                      expenses
                    </small>
                    <Checkbox
                      checked={this.state.expenseChecked}
                      onChange={this.toggleExpenseChecked}
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  <div className="col text-right">
                    <small
                      style={{
                        color: "rgba(0, 0, 0, 0.54)"
                      }}
                    >
                      incomes as positive
                    </small>
                    <FormControlLabel
                      value="top"
                      className="mx-auto m-0"
                      control={
                        <Switch
                          color="primary"
                          checked={this.state.incomeAsPositiveChecked}
                          onChange={this.toggleIncomeAsPositiveChecked}
                        />
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default LineChart;
