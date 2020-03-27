import React, { Component } from "react";
import Navbar from "../model/navbar/Navbar";
import CardArea from "../model/account/CardArea";
import ChooseWeek from "../model/form/ChooseWeek";
import HorizontalScrollMenu from "../model/form/HorizontalScrollMenu";
import DetailArea from "../model/details/DetailArea";
import LineChart from "../model/dashboard/line/LineChart";
import DataTable from "../model/table/DataTable";
import WeekTransactions from "./temp/WeekTransactions";
import { parseDayFromDate } from "./temp/TempFunc";

const navigation = {
  title: "Weekly Dashboard",
  history: [
    {
      title: "Home",
      href: "/"
    },
    {
      title: "Weekly Dashboard",
      href: ""
    }
  ]
};

class ThisWeekDashboardPage extends Component {
  constructor(props) {
    super(props);
    const data = this.getAllData();
    this.state = {
      key: 0,
      week_transactions: data,
      display_transactions: this.parseTransactions(data, "all")
    };
  }

  getAllData = () => {
    return WeekTransactions;
  };

  parseTransactions = (data, day_param) => {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      if (day_param === "all" || day_param === parseDayFromDate(data[i].date)) {
        res = res.concat(data[i].transactions);
      }
    }
    return res;
  };

  getScrollMenuItem() {
    var data = this.state.week_transactions;
    var res = ["all"];
    for (var i = 0; i < data.length; i++) {
      res.push(parseDayFromDate(data[i].date));
    }
    return res;
  }

  handleScrollMenuChange = day_param => {
    this.setState({
      key: this.state.key + 1,
      display_transactions: this.parseTransactions(
        this.state.week_transactions,
        day_param
      )
    });
    //this.refs.detailArea.handleChangeDay(menu_param);
  };

  render() {
    return (
      <Navbar navigationLink={navigation}>
        <CardArea />
        <div className="row mt-5">
          <ChooseWeek />
        </div>
        <div className="row mt-4">
          <LineChart data={this.state.week_transactions} />
        </div>
        <HorizontalScrollMenu
          menus={this.getScrollMenuItem()}
          handleScrollMenuChange={this.handleScrollMenuChange}
        />
        <div className="row">
          <DetailArea
            key={this.state.key}
            data={this.state.display_transactions}
          />
        </div>
        <div className="col-12 px-0 mt-4">
          <DataTable
            key={this.state.key}
            data={this.state.display_transactions}
          />
        </div>
      </Navbar>
    );
  }
}

export default ThisWeekDashboardPage;
