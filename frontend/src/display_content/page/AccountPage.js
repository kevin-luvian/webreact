import React, { Component } from "react";
import Navbar from "../model/navbar/Navbar";
import GraphDetail from "../model/details/GraphDetail";
import WideLineChart from "../model/dashboard/line/WideLineChart";
import DataTable from "../model/table/DataTable";
import AccountCardCarousel from "../model/carousel/AccountCardCarousel";

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
      display_transactions: []
    };
  }

  render() {
    return (
      <Navbar navigationLink={navigation}>
        <div className="row mt-4">
          <div className="col-12">
            <AccountCardCarousel />
          </div>
          <div className="col-12 mt-4">
            <WideLineChart />
          </div>
          <div className="col-12 mt-4">
            <GraphDetail
              key={this.state.key}
              data={this.state.display_transactions}
            />
          </div>
          <div className="col-12 mt-4">
            <DataTable
              key={this.state.key}
              data={this.state.display_transactions}
            />
          </div>
        </div>
      </Navbar>
    );
  }
}

export default AccountPage;
