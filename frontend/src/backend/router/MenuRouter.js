import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomePage from "../../display_content/page/HomePage";
import ThisWeekDashboardPage from "../../display_content/page/ThisWeekDashboardPage";
import ThisMonthDashboardPage from "../../display_content/page/ThisMonthDashboardPage";
import SummaryPage from "../../display_content/page/SummaryPage";
import Login from "../../display_content/model/authenticate/Login";
import Logout from "../../display_content/model/authenticate/Logout";
import ClearTokenAction from "../redux/actions/ClearTokenAction";
import AccountPage from "../../display_content/page/AccountPage";
import SettingsPage from "../../display_content/page/SettingsPage";

class MenuRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  authenticate = () => {
    return this.props.token && this.props.token.length !== 0;
  };

  render() {
    const ProtectedRoute = ({ component: Component, ...rest }) => {
      // this.clearToken();
      // this.checkToken();
      // console.log(window.location.pathname);
      // console.log(this.props.token);
      return (
        <Route
          {...rest}
          render={(props) =>
            this.authenticate() ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
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
          component={ThisWeekDashboardPage}
        />
        <ProtectedRoute
          path="/month-dashboard"
          component={ThisMonthDashboardPage}
        />
        <ProtectedRoute path="/summary-dashboard" component={SummaryPage} />
        <ProtectedRoute path="/account" component={AccountPage} />
        <ProtectedRoute path="/settings" component={SettingsPage} />
        {/**<ProtectedRoute path="/favicon" component={FavIconPage} />*/}
        <ProtectedRoute path="/logout" component={Logout} />
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  ClearTokenAction: () => dispatch(ClearTokenAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuRouter);
