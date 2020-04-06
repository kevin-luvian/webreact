import React, { Component } from "react";
import Navbar from "../model/navbar/Navbar";
import CardArea from "../model/account/CardArea";
import TodayPie from "../model/dashboard/pie/TodayPie";
import GraphDetail from "../model/details/GraphDetail";
import DataTable from "../model/table/DataTable";
import axios from "../../backend/axios/Axios";
import { connect } from "react-redux";

const navigation = {
  title: "Today",
  history: []
};

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyFetch: 0,
      keyCRUD: 0,
      isError: false,
      isLoading: true,
      transactions: [],
      accounts: [],
      categories: []
    };
  }

  incrementKeyFetch = () => {
    this.setState({ keyFetch: this.state.keyFetch + 1 });
  };

  incrementKeyCRUD = () => {
    this.setState({ keyCRUD: this.state.keyCRUD + 1 });
  };

  componentDidMount() {
    this.fetchAccounts();
    this.fetchCategories();
    this.fetchTransactions();
  }

  reload = () => {
    this.fetchTransactions();
    this.incrementKeyCRUD();
  };

  fetchTransactions = async () => {
    await axios
      .post("/api/transaction/betweendate", this.getDate())
      .then(response => {
        this.setState({
          isLoading: false,
          transactions: response.data.payload
        });
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
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isError: true
        });
      });
  };

  getDate = () => {
    let date = new Date();
    let date2 = new Date();
    //date.setDate(date.getDate() + 1);
    date2.setDate(date.getDate() + 1);
    return {
      startDate: this.parseDate(date),
      endDate: this.parseDate(date2)
    };
  };

  parseDate = date => {
    return [
      date.getFullYear(),
      ("0" + (date.getMonth() + 1)).slice(-2),
      ("0" + date.getDate()).slice(-2)
    ].join("-");
  };

  render() {
    return (
      <Navbar navigationLink={navigation}>
        <CardArea key={this.state.keyCRUD} isLoading={this.state.isLoading} />
        <div className="row mt-4">
          <div className="col-lg-6 my-auto">
            <TodayPie
              key={this.state.keyFetch}
              isLoading={this.state.isLoading}
              data={this.state.transactions}
            />
          </div>
          <div className="col-lg-6">
            <GraphDetail
              key={this.state.keyFetch}
              isLoading={this.state.isLoading}
              data={this.state.transactions}
            />
          </div>
        </div>
        <div className="col-12 px-0 mt-4">
          <DataTable
            key={this.state.keyFetch}
            isLoading={this.state.isLoading}
            data={this.state.transactions}
            currentDate={new Date()}
            default={this.props.default}
            accounts={this.state.accounts}
            categories={this.state.categories}
            fetchTransactions={this.fetchTransactions}
            reload={this.reload}
          />
        </div>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(MainContent);
