import React, { Component } from "react";
import axios from "../../backend/axios/Axios";
import Navbar from "../model/navbar/Navbar";
import DataTable from "../model/table/DataTable";
import AccountCardCarousel from "../model/carousel/AccountCardCarousel";
import DetailAreaCashFlow from "../model/details/DetailAreaCashFlow";

const navigation = {
  title: "Account",
  history: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Account",
      href: "",
    },
  ],
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
      currentId: "",
      transactions: [],
      accounts: [],
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchAccounts();
    this.fetchCategories();
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

  handleAccountChange = (id) => {
    if (this.state.currentId !== id) {
      this.setState({ currentId: id });
      this.fetchTransactions(id);
      this.incrementKey();
    }
  };

  reload = () => {
    this.fetchTransactions(this.state.currentId);
    this.incrementKeyCRUD();
  };

  fetchTransactions = (id) => {
    axios
      .post("/api/account/transactions", id)
      .then((response) => {
        this.setState({
          isLoading: false,
          transactions: response.data.payload,
        });
        this.incrementKey();
        this.incrementKeyFetch();
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isError: true,
        });
      });
  };

  fetchAccounts = async () => {
    await axios
      .get("/api/account/all")
      .then((response) => {
        let firstAccountId = response.data.payload[0].id;
        console.log(firstAccountId);
        this.setState({
          currentId: firstAccountId,
          accounts: response.data.payload,
        });
        this.fetchTransactions(firstAccountId);
        this.incrementKey();
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isError: true,
        });
      });
  };

  fetchCategories = async () => {
    await axios
      .get("/api/category/all")
      .then((response) => {
        this.setState({
          categories: response.data.payload,
        });
        this.incrementKey();
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isError: true,
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
            handleClick={this.handleAccountChange}
          />
        </div>
        <div className="row mt-4">
          <DetailAreaCashFlow
            key={this.state.key}
            data={this.state.transactions}
            isLoading={this.state.isLoading}
          />
        </div>
        <div className="col-12 px-0 mt-4">
          <DataTable
            key={this.state.key}
            data={this.state.transactions}
            isLoading={this.state.isLoading}
            defaultAccount={this.state.currentId}
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
