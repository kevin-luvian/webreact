import React, { Component } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import {
  parseDate,
  dateSort,
  parseDayFromDate,
  parseMonthFromDate,
} from "../../../backend/function/Function";

class HorizontalScrollMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
    };
  }

  componentDidMount() {
    if (this.props.mode === "year") this.getYearMenu();
    if (this.props.mode === "month") this.getMonthMenu();
    if (this.props.mode === "day") this.getDayMenu();
  }

  handleClick = (value) => {
    this.props.handleScrollMenuChange(value);
  };

  getYearMenu() {
    let data = [...this.props.data];
    let currentYear = this.props.currentValue;
    const today = parseDate(new Date());
    let res = [{ name: "all", value: "all" }];
    data.push({ date: today });
    data.sort(dateSort());
    for (let i = 0; i < data.length; i++) {
      let year = data[i].date.split("-")[0];
      if (year !== currentYear) {
        res.push({ name: year, value: year });
        currentYear = year;
      }
    }
    this.setState({ menus: res });
  }

  getMonthMenu = () => {
    let res = [{ name: "all", value: "all" }];
    let date = new Date();
    for (let i = 0; i < 12; i++) {
      date.setMonth(i);
      let month = parseMonthFromDate(date);
      res.push({ name: month, value: month });
    }
    this.setState({ menus: res });
  };

  getDayMenu() {
    let date = new Date(this.props.startDate);
    var res = [
      { name: "all", value: "all" },
      { name: parseDayFromDate(date), value: parseDate(date) },
    ];
    for (var i = 0; i < 6; i++) {
      date.setDate(date.getDate() + 1);
      res.push({ name: parseDayFromDate(date), value: parseDate(date) });
    }
    this.setState({ menus: res });
  }

  checkValue = (currentValue, menuValue) => {
    try {
      if (menuValue === "all" || this.props.mode !== "day")
        return currentValue === menuValue;
      return parseDate(currentValue) === menuValue;
    } catch {
      return false;
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.props.isLoading ? (
          <div className="card shadow mt-4" style={{ minHeight: "60px" }}>
            <div className="center mx-auto">
              <ScaleLoader color={"#007bff"} height={25} width={5} margin={5} />
            </div>
          </div>
        ) : (
          <div className="scrollmenu px-3 pb-2">
            {this.state.menus.map((menu, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  className={
                    "shadow-tight mr-3 " +
                    (this.checkValue(this.props.currentValue, menu.value)
                      ? "btn-mywhite-focus"
                      : "btn-mywhite")
                  }
                  onClick={() => this.handleClick(menu.value)}
                >
                  <span className="font-weight-bold">{menu.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default HorizontalScrollMenu;
