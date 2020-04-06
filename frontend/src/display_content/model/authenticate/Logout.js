import React, { Component } from "react";
import { connect } from "react-redux";
import ClearTokenAction from "../../../backend/redux/actions/ClearTokenAction";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  route = () => {
    this.props.ClearTokenAction();
    return (
      <Redirect
        to={{
          pathname: "/login"
        }}
      />
    );
  };

  render() {
    return this.route();
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  ClearTokenAction: () => dispatch(ClearTokenAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
