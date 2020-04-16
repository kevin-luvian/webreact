import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import ScaleLoader from "react-spinners/ScaleLoader";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Checkbox,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import {
  parseDate,
  dateSort,
  convertToDate,
} from "../../../../backend/function/Function";

const modes = ["normal", "cumulative"];

am4core.useTheme(am4themes_animated);

class WideLineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "normal",
      incomeAsPositiveChecked: false,
      incomeChecked: true,
      expenseChecked: true,
      data: [],
      chart: {},
    };
  }

  componentDidMount() {
    if (!this.props.isLoading) {
      this.loadAndSort();
    }
  }

  handleModeChange = (e) => {
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

  reload = () => {
    /*
    let chart = this.state.chart;
    chart.data = this.processData();
    this.setState({ chart: chart });
    */
    this.state.chart.data = this.processData();
  };

  loadAndSort = () => {
    let data = this.props.data;
    let res = [];
    try {
      data.sort(dateSort());
    } catch {
      console.log("error sorting");
    }
    for (let i = 0; i < data.length - 1; i++) {
      //res.push({ date: data[i].date, value: data[i].value });
      res.push(data[i]);
      try {
        let currentDate = convertToDate(data[i].date);
        let nextdate = convertToDate(data[i + 1].date);
        nextdate.setDate(nextdate.getDate() - 1);
        while (currentDate.getTime() < nextdate.getTime()) {
          currentDate.setDate(currentDate.getDate() + 1);
          res.push({ date: parseDate(currentDate), value: 0 });
        }
      } catch {
        console.log("error at " + data[i].date);
      }
    }
    res.push(data[data.length - 1]);

    this.setState({ data: res }, () => {
      console.log(this.state.data);
      this.loadChart();
    });
  };

  loadChart = async () => {
    // Create chart instance
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    chart.data = this.processData();

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Transactions";

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.strokeWidth = 3;
    series.minBulletDistance = 10;
    series.tooltipText = "{valueY}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 0.5;
    //series.tooltip.label.padding(12, 12, 12, 12);

    // Add scrollbar
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    this.setState({ chart: chart });
  };

  processData = () => {
    let data = this.state.data;
    let container = [];
    let currentDate = "";
    let containerIdx = -1;
    for (let i = 0; i < data.length; i++) {
      let date = data[i].date;
      let type = data[i].type;
      let value = type ? data[i].value : data[i].value * -1;
      if (
        value === 0 ||
        (type && this.state.expenseChecked) ||
        (!type && this.state.incomeChecked)
      ) {
        if (this.state.incomeAsPositiveChecked) value *= -1;
        if (currentDate === date) {
          container[containerIdx].value += value;
        } else {
          if (this.state.mode === "cumulative" && container[containerIdx]) {
            value += container[containerIdx].value;
          }
          container.push({
            date: date,
            value: value,
          });
          currentDate = date;
          containerIdx += 1;
        }
      }
    }
    return container;
  };

  render() {
    return (
      <React.Fragment>
        {this.props.isLoading ? (
          <div className="card shadow" style={{ minHeight: "500px" }}>
            <div className="center mx-auto">
              <ScaleLoader color={"#8914fe"} height={70} width={5} margin={5} />
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
              <div className="row">
                <div id="chartdiv" style={{ width: "100%", height: "500px" }} />
              </div>
              <hr />
              <div className="row ">
                <div className="col">
                  <small
                    style={{
                      color: "rgba(0, 0, 0, 0.54)",
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
                      color: "rgba(0, 0, 0, 0.54)",
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
                      color: "rgba(0, 0, 0, 0.54)",
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
      </React.Fragment>
    );
  }
}

export default WideLineChart;
