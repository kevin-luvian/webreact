import React, { Component } from "react";
import Navbar from "../model/navbar/Navbar";
import CardArea from "../model/account/CardArea";
import HorizontalScrollMenu from "../model/form/HorizontalScrollMenu";
import DetailArea from "../model/details/DetailArea";
import LineChart from "../model/dashboard/line/LineChart";
import DataTable from "../model/table/DataTable";
import WeekTransactions from "./temp/WeekTransactions.js";
import ChooseDate from "../model/form/ChooseDate";
import axios from "../../backend/axios/Axios";
import { parseDate } from "../../backend/function/Function";

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
      key: 0,
      keyCRUD: 0,
      keyFetch: 0,
      isError: false,
      isLoading: true,
      startDate: this.getStartDateAndEndDate(new Date()).startDate,
      currentDate: "all",
      transactions: [],
      accounts: [],
      categories: []
    };
  }

  componentDidMount() {
    this.fetchAccounts();
    this.fetchCategories();
    this.fetchTransactions();
  }

  incrementKey = () => {
    this.setState({ key: this.state.key + 1 });
  };

  fetchTransactions = async () => {
    await axios
      .post(
        "/api/transaction/betweendate",
        this.getStartDateAndEndDate(this.state.startDate)
      )
      .then(response => {
        this.setState({
          isLoading: false,
          keyFetch: this.state.keyFetch + 1,
          transactions: response.data.payload
        });
        this.incrementKey();
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isError: true
        });
      });
  };

  fetchAccounts = async () => {
    await axios
      .get("/api/account/all")
      .then(response => {
        this.setState({
          accounts: response.data.payload
        });
        this.incrementKey();
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isError: true
        });
      });
  };

  fetchCategories = async () => {
    await axios
      .get("/api/category/all")
      .then(response => {
        this.setState({
          categories: response.data.payload
        });
        this.incrementKey();
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isError: true
        });
      });
  };

  getStartDateAndEndDate = date_param => {
    let startDate = new Date(date_param);
    startDate.setDate(1);
    let endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0);
    return {
      startDate: parseDate(startDate),
      endDate: parseDate(endDate)
    };
  };

  handleDateChange = dateStr_param => {
    this.setState(
      {
        startDate: this.getStartDateAndEndDate(dateStr_param).startDate,
        currentDate: "all"
      },
      () => {
        //this.fetchTransactions();
        console.log("date is changed");
        console.log(this.state.startDate);
      }
    );
  };

  render() {
    return (
      <Navbar navigationLink={navigation}>
        <CardArea key={this.state.keyCRUD} />
        <div className="mt-4">
          <ChooseDate
            key={this.state.key}
            isLoading={this.state.isLoading}
            startDate={this.state.startDate}
            handleSubmit={this.handleDateChange}
          />
        </div>
      </Navbar>
    );
  }
}

export default ThisWeekDashboardPage;
