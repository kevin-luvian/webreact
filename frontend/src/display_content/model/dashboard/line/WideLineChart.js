import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import BeatLoader from "react-spinners/BeatLoader";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class WideLineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChartLoading: true
        };
    }

    componentDidMount() {
        let worker = new Worker(this.loadChart());
        worker.terminate()
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    loadChart = async () => {
        // await new Promise(r => setTimeout(r, 100));
        // Create chart instance
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        // Add data
        chart.data = this.processData(this.generateChartData());

        // Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 50;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Daily Transactions";

        // Create series
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "visits";
        series.dataFields.dateX = "date";
        series.strokeWidth = 2;
        series.minBulletDistance = 10;
        series.tooltipText = "{valueY}";
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.background.cornerRadius = 20;
        series.tooltip.background.fillOpacity = 0.5;
        series.tooltip.label.padding(12, 12, 12, 12);

        // Add scrollbar
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = dateAxis;
        chart.cursor.snapToSeries = series;

        this.setState({
            isChartLoading: false
        })
    };

    generateChartData = () => {
        let chartData = [];
        let firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 1000);
        let visits = 1200;
        for (var i = 0; i < 200; i++) {
            // we create date objects here. In your data, you can have date strings
            // and then set format of your dates using chart.dataDateFormat property,
            // however when possible, use date objects, as this will speed up chart rendering.
            let newDate = new Date(firstDate);

            newDate.setDate(newDate.getDate() + i);
            /*if (Math.random() >= 0.5) {
                newDate.setDate(newDate.getDate() + i);
            } else {
                newDate.setDate(newDate.getDate() + i - 1);
            }*/

            visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);

            chartData.push({
                date: newDate,
                visits: visits
            });
        }
        return chartData;
    };

    processData = data => {
        let container = {};
        for (let i = 0; i < data.length; i++) {
            // console.log(element)
            let element = data[i];
            if (element["date"] in container) {
                container[element["date"]] = {
                    date: element["date"],
                    visits: element["visits"] + container[element["date"]]["visits"]
                };
            } else {
                container[element["date"]] = element;
            }
        }

        let result = [];
        for (let element in container) {
            // console.log(container[element]);
            result.push(container[element]);
        }
        result.sort(this.functionSort());
        return result;
    };

    functionSort = () => {
        return function (a, b) {
            function compareNum(a, b) {
                let sub = a - b;
                if (sub > 0) return 1;
                else if (sub < 0) return -1;
                return 0;
            }

            function changeMonth(monthStr) {
                let res = 0;
                switch (monthStr) {
                    case "Jan":
                        res = 1;
                        break;
                    case "Feb":
                        res = 2;
                        break;
                    case "Mar":
                        res = 3;
                        break;
                    case "Apr":
                        res = 4;
                        break;
                    case "May":
                        res = 5;
                        break;
                    case "Jun":
                        res = 6;
                        break;
                    case "Jul":
                        res = 7;
                        break;
                    case "Aug":
                        res = 8;
                        break;
                    case "Sep":
                        res = 9;
                        break;
                    case "Oct":
                        res = 10;
                        break;
                    case "Nov":
                        res = 11;
                        break;
                    case "Dec":
                        res = 12;
                        break;
                    default:
                        break;
                }
                return res;
            };

            let split = (a["date"] + "").split(" ");
            let split2 = (b["date"] + "").split(" ");
            let res = 0;

            // compare year
            res = compareNum(parseInt(split[3]), parseInt(split2[3]));
            // console.log(split[3] + " =/= " + split2[3]);
            // console.log(res);
            if (res === 0) {
                // compare month
                res = compareNum(changeMonth(split[1]), changeMonth(split2[1]));
                if (res === 0) {
                    // compare day
                    res = compareNum(parseInt(split[2]), parseInt(split2[2]));
                }
            }
            return res;
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className="card shadow">
                    {
                        this.state.isChartLoading &&
                        <div className="m-auto" style={{ transform: "translateY(500%)" }}>
                            <BeatLoader
                                color={"#8914fe"}
                                size={40}
                            />
                        </div>
                    }
                    <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>

                </div>
            </React.Fragment>
        );
    }
}

export default WideLineChart;
