import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomePage from "../../display_content/page/HomePage";
import ThisWeekDashboardPage from "../../display_content/page/ThisWeekDashboardPage";
import ThisMonthDashboardPage from "../../display_content/page/ThisMonthDashboardPage";
import Login from "../../display_content/model/authenticate/Login";
import Logout from "../../display_content/model/authenticate/Logout";
import axios from "../axios/Axios";
import SetHistoryAction from "../redux/actions/SetHistoryAction";
import ClearTokenAction from "../redux/actions/ClearTokenAction";
import AccountPage from "../../display_content/page/AccountPage";

class MenuRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  isEmpty = str => {
    return !str || 0 === str.length;
  };

  checkToken = async () => {
    const token = this.props.token;
    if (!this.isEmpty(token)) {
      axios
        .get("/checkauth", {
          headers: {
            Authorization: "Bearer " + token,
            "Access-Control-Allow-Credentials": "true"
          }
        })
        .then(response => {
          console.log("authenticated");
        })
        .catch(error => {
          console.log("token is invalid");
          this.props.ClearTokenAction();
        });
    }
  };

  render() {
    const ProtectedRoute = ({ component: Component, ...rest }) => {
      //this.checkToken()
      console.log(window.location.pathname);
      return (
        <Route
          {...rest}
          render={props =>
            //!this.isEmpty(this.props.token)?
            true ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login"
                }}
              />
            )
          }
        />
      );
    };

    return (
      <Router>
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/" exact component={HomePage} />
        <ProtectedRoute
          path="/week-dashboard"
          exact
          component={ThisWeekDashboardPage}
        />
        <ProtectedRoute
          path="/month-dashboard"
          exact
          component={ThisMonthDashboardPage}
        />
        <ProtectedRoute path="/account" exact component={AccountPage} />
        <ProtectedRoute path="/logout" component={Logout} />
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  SetHistoryAction: () => dispatch(SetHistoryAction()),
  ClearTokenAction: () => dispatch(ClearTokenAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuRouter);
