import React, { Component } from "react";
import Navbar from "../model/navbar/Navbar";
import DataTable from "../model/table/DataTable";
import AccountCardCarousel from "../model/carousel/AccountCardCarousel";
import axios from "../../backend/axios/Axios";

const navigation = {
  title: "Account",
  history: [
    {
      title: "Home",
      href: "/"
    },
    {
      title: "Account",
      href: ""
    }
  ]
};

class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
      keyFetch: 0,
      keyCRUD: 0,
      isError: false,
      isLoading: true,
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
        this.setState({
          isLoading: false,
          transactions: response.data.payload
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
        console.log(this.state.accounts);
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

  render() {
    return (
      <Navbar navigationLink={navigation}>
        <div className="mt-4">
          <AccountCardCarousel
            key={this.state.keyCRUD} 
            data={this.state.accounts}
          />
        </div>
        <div className="col-12 px-0 mt-4">
          <DataTable
            key={this.state.key}
            data={this.state.transactions}
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

export default AccountPage;
