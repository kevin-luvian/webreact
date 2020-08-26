import React, { Component } from "react";
import Navbar from "../model/navbar/Navbar";
import CardArea from "../model/account/CardArea";
import ChooseDate from "../model/form/ChooseDate";
import HorizontalScrollMenu from "../model/form/HorizontalScrollMenu";
import DetailArea from "../model/details/DetailArea";
import LineChart from "../model/chart/line/LineChart";
import DataTable from "../model/table/DataTable";
import axios from "../../backend/axios/Axios";
import { parseDate } from "../../backend/function/Function";

const navigation = {
  title: "Weekly Dashboard",
  history: [
    {
      title: "Home",
      href: "/"
    },
    {
      title: "Weekly",
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
      display_transactions: [],
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

  incrementKeyFetch = () => {
    this.setState({ keyFetch: this.state.keyFetch + 1 });
  };

  incrementKeyCRUD = () => {
    this.setState({ keyCRUD: this.state.keyCRUD + 1 });
  };

  reload = () => {
    this.fetchTransactions();
    this.incrementKeyCRUD();
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
          transactions: response.data.payload,
          display_transactions: this.getDisplayTransactions(
            response.data.payload,
            this.state.currentDate
          )
        });
        this.incrementKey();
        this.incrementKeyFetch();
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
    startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);
    return {
      startDate: parseDate(startDate),
      endDate: parseDate(endDate)
    };
  };

  getDisplayTransactions = (transactions, date_param) => {
    if (date_param === "all") return transactions;

    let newTransactions = [];
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].date === parseDate(date_param))
        newTransactions.push(transactions[i]);
    }

    return newTransactions;
  };

  handleScrollMenuChange = dateStr_param => {
    if (dateStr_param === "all") {
      this.setState({
        display_transactions: this.state.transactions,
        currentDate: "all"
      });
    } else {
      this.setState({
        display_transactions: this.getDisplayTransactions(
          this.state.transactions,
          new Date(dateStr_param)
        ),
        currentDate: new Date(dateStr_param)
      });
    }
    this.incrementKey();
  };

  handleScrollMenuChange2 = menu_param => {
    console.log(menu_param);
  };

  handleDateChange = dateStr_param => {
    console.log("Change Date >> " + parseDate(dateStr_param));
    let datek = this.getStartDateAndEndDate(dateStr_param).startDate;
    console.log("DATEE >> " + datek);
    this.setState(
      {
        startDate: this.getStartDateAndEndDate(dateStr_param).startDate,
        currentDate: "all"
      },
      () => {
        this.fetchTransactions();
      }
    );
  };

  render() {
    return (
      <Navbar navigationLink={navigation}>
        <CardArea key={this.state.keyCRUD} />
        <div className="mt-5">
          <ChooseDate
            isLoading={this.state.isLoading}
            startDate={this.state.startDate}
            handleSubmit={this.handleDateChange}
          />
        </div>
        <div className="row mt-4">
          <LineChart
            key={this.state.keyFetch}
            isLoading={this.state.isLoading}
            startDate={this.state.startDate}
            data={this.state.transactions}
          />
        </div>
        <div className="mt-4">
          <HorizontalScrollMenu
            key={this.state.keyFetch}
            mode="day"
            startDate={this.state.startDate}
            currentValue={this.state.currentDate}
            isLoading={this.state.isLoading}
            handleScrollMenuChange={this.handleScrollMenuChange}
          />
        </div>
        <div className="row mt-4">
          <DetailArea
            key={this.state.key}
            data={this.state.display_transactions}
            isLoading={this.state.isLoading}
            categories={this.state.categories}
          />
        </div>
        <div className="col-12 px-0 mt-4">
          <DataTable
            key={this.state.key}
            data={this.state.display_transactions}
            isLoading={this.state.isLoading}
            accounts={this.state.accounts}
            categories={this.state.categories}
            currentDate={new Date()}
            reload={this.reload}
          />
        </div>
      </Navbar>
    );
  }
}

export default ThisWeekDashboardPage;
