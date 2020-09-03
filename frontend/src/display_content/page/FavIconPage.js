import React, { Component } from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import AuthNavbarWrapper from "../model/wrapper/AuthNavbarWrapper";
import favicondata from "../../backend/data/Favicon";

const navigation = {
  title: "FavIcon",
  history: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Settings",
      href: "/settings",
    },
    {
      title: "FavIcon",
      href: "",
    },
  ],
};

class FavIconPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParam: "",
      searchData: [],
      allData: [],
    };
  }

  componentDidMount() {
    this.renderAll();
  }

  handleSearch = (e) => {
    this.setState(
      {
        searchParam: e.target.value.toLowerCase(),
      },
      this.renderSearch
    );
  };

  renderSearch = () => {
    var res = [];
    let searchParam = this.state.searchParam;
    let counter = 0;
    if (searchParam.trim().length > 0) {
      for (let i = 1; i < favicondata.length; i++) {
        for (let j = 0; j < favicondata[i].icons.length; j++) {
          if (favicondata[i].icons[j].text.includes(searchParam))
            res.push(this.renderIcon(favicondata[i].icons[j], counter++));
        }
      }
    }
    this.setState({ searchData: res });
  };

  renderAll = () => {
    var res = [];
    for (let i = 0; i < favicondata.length; i++) {
      res.push(
        <div key={i} className="col-12 mt-5">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title"> {favicondata[i].title} </h4>
              <div className="row">
                {favicondata[i].icons.map((icon, index) => {
                  return this.renderIcon(icon, index);
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }
    this.setState({ allData: res });
  };

  renderIcon = (icon, index) => {
    return (
      <div key={index} className="fw-icons col-lg-3 col-sm-6">
        <p>
          <i className={icon.value} />
          {icon.text}
        </p>
      </div>
    );
  };

  render() {
    return (
      <AuthNavbarWrapper navigationLink={navigation}>
        <div className="row">
          <div className="col-12 mt-5">
            <div className="card">
              <div className="card-body">
                <TextField
                  className="w-100"
                  error={false}
                  helperText="browse icon from fontawesome"
                  label="Search Icon"
                  value={this.state.searchParam}
                  onChange={this.handleSearch}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <i
                          className="fa fa-search mr-2"
                          style={{ color: "#444" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <div className="row mt-3">{this.state.searchData}</div>
              </div>
            </div>
          </div>
          {this.state.allData}
        </div>
      </AuthNavbarWrapper>
    );
  }
}

export default FavIconPage;
