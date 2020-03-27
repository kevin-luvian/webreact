import React, { Component } from "react";
import Navbar from "../model/navbar/Navbar";
import CardArea from "../model/account/CardArea";
import TodayPie from "../model/dashboard/pie/TodayPie";
import GraphDetail from "../model/details/GraphDetail";
import DataTable from "../model/table/DataTable";
import TodayTransactions from "./temp/TodayTransactions";

const navigation = {
  title: "Today",
  history: []
};

class MainContent extends Component {
  constructor(props) {
    super(props);
    let data = this.getAllData();
    this.state = {
      key: 0,
      today_transactions: data,
      display_transactions: this.parseTransactions(data)
    };
  }

  getAllData = () => {
    return TodayTransactions;
  };

  parseTransactions = data => {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      res = res.concat(data[i].transactions);
    }
    return res;
  };

  render() {
    return (
      <Navbar navigationLink={navigation}>
        <CardArea />
        <div className="row mt-4">
          <div className="col-lg-6 my-auto">
            <TodayPie
              key={this.state.key}
              data={this.state.display_transactions}
            />
          </div>
          <div className="col-lg-6">
            <GraphDetail
              key={this.state.key}
              data={this.state.display_transactions}
            />
          </div>
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

export default MainContent;
