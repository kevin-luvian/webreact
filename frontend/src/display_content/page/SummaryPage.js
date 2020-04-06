import React, { Component } from "react";
import Navbar from "../model/navbar/Navbar";
import DetailArea from "../model/details/DetailArea";
import CardArea from "../model/account/CardArea";
import DataTable from "../model/table/DataTable";
import axios from "../../backend/axios/Axios";
import WideLineChart from "../model/dashboard/line/WideLineChart";
import HorizontalScrollMenu from "../model/form/HorizontalScrollMenu";
import {
  convertToDate,
  parseDate,
  parseMonthToInt
} from "../../backend/function/Function";

const navigation = {
  title: "Summary Dashboard",
  history: [
    {
      title: "Home",
      href: "/"
    },
    {
      title: "Summary",
      href: ""
    }
  ]
};

class SummaryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
      keyFetch: 0,
      keyCRUD: 0,
      isError: false,
      isLoading: true,
      currentYear: "all",
      currentMonth: "all",
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
      .get("/api/transaction/all")
      .then(response => {
        this.setState(
          {
            isLoading: false,
            transactions: response.data.payload
          },
          () => {
            this.setState({
              display_transactions: this.createDisplayTransactions()
            });
          }
        );
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

  createDisplayTransactions = () => {
    if (this.state.currentYear === "all") {
      return this.getDisplayTransactions("all", "");
    }

    if (this.state.currentMonth === "all") {
      let dateRange = this.getStartDateAndEndDate("year");
      return this.getDisplayTransactions(
        dateRange.startDate,
        dateRange.endDate
      );
    }

    let dateRange = this.getStartDateAndEndDate("month");
    return this.getDisplayTransactions(dateRange.startDate, dateRange.endDate);
  };

  getDisplayTransactions = (startDate, endDate) => {
    let transactions = this.state.transactions;
    if (startDate === "all") return transactions;
    startDate = convertToDate(startDate).getTime();
    endDate = convertToDate(endDate).getTime();
    let res = [];
    for (let i = 0; i < transactions.length; i++) {
      let currentDate = convertToDate(transactions[i].date).getTime();
      if (startDate <= currentDate && currentDate <= endDate) {
        res.push(transactions[i]);
      }
    }
    return res;
  };

  handleYearChange = payload => {
    if (this.state.currentYear !== payload) {
      this.setState({ currentYear: payload, currentMonth: "all" }, () => {
        this.setState({
          display_transactions: this.createDisplayTransactions()
        });
        this.incrementKey();
      });
    }
  };

  handleMonthChange = payload => {
    if (this.state.currentMonth !== payload) {
      this.setState({ currentMonth: payload }, () => {
        this.setState({
          display_transactions: this.createDisplayTransactions()
        });
        this.incrementKey();
      });
    }
  };

  getStartDateAndEndDate = mode => {
    if (mode === "year") {
      return {
        startDate: parseDate(new Date(parseInt(this.state.currentYear), 0)),
        endDate: parseDate(new Date(parseInt(this.state.currentYear), 12, 0))
      };
    } else if (mode === "month") {
      return {
        startDate: parseDate(
          new Date(
            parseInt(this.state.currentYear),
            parseMonthToInt(this.state.currentMonth),
            1
          )
        ),
        endDate: parseDate(
          new Date(
            parseInt(this.state.currentYear),
            parseMonthToInt(this.state.currentMonth) + 1,
            0
          )
        )
      };
    }
  };

  getCurrentDate = () => {
    if (this.state.currentYear === "all") return new Date();
    else if (this.state.currentMonth === "all")
      return this.getStartDateAndEndDate("year").startDate;
    else return this.getStartDateAndEndDate("month").startDate;
  };

  render() {
    return (
      <Navbar navigationLink={navigation}>
        <CardArea key={this.state.keyCRUD} />
        <div className="col-12 px-0 mt-4">
          <WideLineChart
            key={this.state.keyFetch}
            isLoading={true}
            isLoading={this.state.isLoading}
            data={this.state.transactions}
          />
        </div>
        <div className="mt-4">
          <HorizontalScrollMenu
            key={this.state.keyFetch}
            mode="year"
            data={this.state.transactions}
            currentValue={this.state.currentYear}
            isLoading={this.state.isLoading}
            handleScrollMenuChange={this.handleYearChange}
          />
        </div>
        {this.state.currentYear !== "all" && (
          <div className="mt-3">
            <HorizontalScrollMenu
              key={this.state.keyFetch}
              mode="month"
              currentValue={this.state.currentMonth}
              isLoading={this.state.isLoading}
              handleScrollMenuChange={this.handleMonthChange}
            />
          </div>
        )}
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
            currentDate={this.getCurrentDate()}
            reload={this.reload}
          />
        </div>
      </Navbar>
    );
  }
}

export default SummaryPage;
