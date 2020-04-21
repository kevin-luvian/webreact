import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
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

  authenticate = () => {
    return this.props.token && this.props.token.length !== 0;
  };

  renderContent = () => {
    return (
      <div className="error-area text-center">
        <div className="container">
          <div className="error-content">
            <h2>404</h2>
            <p>Ooops! Something went wrong .</p>
            <Link to="/">Back to Dashboard</Link>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.authenticate() ? (
          <Navbar navigationLink={navigation}>{this.renderContent()}</Navbar>
        ) : (
          this.renderContent()
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Error404Page);
