import React, { Component } from "react";
import Navbar from "../model/navbar/Navbar";
import CardArea from "../model/account/CardArea";
import ChooseWeek from "../model/form/ChooseWeek";
import HorizontalScrollMenu from "../model/form/HorizontalScrollMenu";
import DetailArea from "../model/details/DetailArea";
import LineChart from "../model/dashboard/line/LineChart";
import DataTable from "../model/table/DataTable";
import WeekTransactions from "./temp/WeekTransactions.js";

const navigation = {
  title: "Monthly Dashboard",
  history: [
    {
      title: "Home",
      href: "/"
    },
    {
      title: "Monthly Dashboard",
      href: ""
    }
  ]
};

class ThisWeekDashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      week_transactions: WeekTransactions
    };
  }

  getScrollMenuItem() {
    var data = this.state.week_transactions;
    var res = ["all"];
    for (var i = 0; i < data.length; i++) {
      res.push(data[i].day);
    }
    return res;
  }

  handleScrollMenuChange = menu_param => {
    this.refs.detailArea.handleChangeDay(menu_param);
  };

  render() {
    return (
      <Navbar navigationLink={navigation}>
        <CardArea />
      </Navbar>
    );
  }
}

export default ThisWeekDashboardPage;
