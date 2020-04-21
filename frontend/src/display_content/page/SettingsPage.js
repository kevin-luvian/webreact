import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../model/navbar/Navbar";
import CategoryTable from "../model/table/CategoryTable";
import AccountTable from "../model/table/AccountTable";
import DefaultSettings from "../model/form/DefaultSettings";

class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
      listAccount: [],
      listCategory: [],
    };
  }

  handleAccountChange = (data) => {
    this.setState({
      key: this.state.key + 1,
      listAccount: data,
    });
  };

  handleCategoryChange = (data) => {
    this.setState({
      key: this.state.key + 1,
      listCategory: data,
    });
  };

  render() {
    const navigation = {
      title: "Settings",
      history: [
        {
          title: "Home",
          href: "/",
        },
        {
          title: "Settings",
          href: "",
        },
      ],
    };
    return (
      <Navbar navigationLink={navigation}>
        <div className="container mt-4">
          <div className="col-12 px-0">
            <div className="col-12 col-sm-11 mx-auto px-0 px-sm-3">
              <p className="settings-title">Accounts</p>
              <AccountTable
                data={this.state.listAccount}
                handleChange={this.handleAccountChange}
              />
              <p className="mt-2 text-muted">
                find more icon at <Link to="/favicon">/favicon</Link>
              </p>
            </div>
          </div>
          <div className="col-12 px-0 mt-5">
            <div className="col-12 col-sm-11 mx-auto px-0 px-sm-3">
              <p className="settings-title">Categories</p>
              <CategoryTable
                data={this.state.listCategory}
                handleChange={this.handleCategoryChange}
              />
            </div>
          </div>
          <div className="col-12 px-0 mt-5">
            <div className="col-12 col-sm-11 mx-auto px-0 px-sm-3">
              <p className="settings-title">Default</p>
              <DefaultSettings
                key={this.state.key}
                listAccount={this.state.listAccount}
                listCategory={this.state.listCategory}
              />
            </div>
          </div>
        </div>
      </Navbar>
    );
  }
}

export default SettingsPage;
