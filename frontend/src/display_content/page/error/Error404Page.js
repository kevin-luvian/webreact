import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../model/navbar/Navbar";

const navigation = {
  title: "404",
  history: [
    {
      title: "Error",
      href: "/",
    },
    {
      title: "404",
      href: "",
    },
  ],
};

class Error404Page extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Navbar navigationLink={navigation}>
        <div className="error-area text-center">
          <div className="container">
            <div className="error-content">
              <h2>404</h2>
              <p>Ooops! Something went wrong .</p>
              <Link to="/">Back to Dashboard</Link>
            </div>
          </div>
        </div>
      </Navbar>
    );
  }
}

export default Error404Page;
