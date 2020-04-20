import React, { Component } from "react";
import Navbar from "../model/navbar/Navbar";
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
    this.state = {};
  }

  renderData = () => {
    var res = [];
    for (let i = 0; i < favicondata.length; i++) {
      res.push(
        <div key={i} className="col-12 mt-5">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title"> {favicondata[i].title} </h4>
              <div className="row">
                {favicondata[i].icons.map((icon, index) => {
                  return (
                    <div key={index} className="fw-icons col-lg-3 col-sm-6">
                      <p>
                        <i className={icon.value} />{icon.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return res;
  };

  render() {
    return (
      <Navbar navigationLink={navigation}>
        <div className="main-content-inner">
          <div className="row">{this.renderData()}</div>
        </div>
      </Navbar>
    );
  }
}

export default FavIconPage;
