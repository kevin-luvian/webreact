import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { connect } from "react-redux";
import HomePage from "../../display_content/page/HomePage";
import ThisWeekDashboardPage from "../../display_content/page/ThisWeekDashboardPage";
import SummaryPage from "../../display_content/page/SummaryPage";
import Login from "../../display_content/model/authenticate/Login";
import Logout from "../../display_content/model/authenticate/Logout";
import ClearTokenAction from "../redux/actions/ClearTokenAction";
import ClearStoreAction from "../redux/actions/ClearStoreAction";
import AccountPage from "../../display_content/page/AccountPage";
import SettingsPage from "../../display_content/page/SettingsPage";
import FavIconPage from "../../display_content/page/FavIconPage";
import Error404Page from "../../display_content/page/error/Error404Page";
import UserManagementPage from "../../display_content/page/UserManagementPage";
import TargetPage from "../../display_content/page/TargetPage";
import axios from "../axios/Axios";

class MenuRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  authenticate = () => {
    this.authCheck();
    return this.props.token && this.props.token.length !== 0;
  };

  authCheck = () => {
    axios.get("/auth/check").then(
      () => {},
      () => {
        this.props.ClearStoreAction();
      }
    );
  };

  render() {
    const ProtectedRoute = ({ component: Component, ...rest }) => {
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
        <Switch>
          <ProtectedRoute path="/" exact component={HomePage} />
          <ProtectedRoute
            path="/week-dashboard"
            component={ThisWeekDashboardPage}
          />
          <ProtectedRoute
            path="/user-management"
            component={UserManagementPage}
          />
          <ProtectedRoute path="/summary-dashboard" component={SummaryPage} />
          <ProtectedRoute path="/account" component={AccountPage} />
          <ProtectedRoute path="/settings" component={SettingsPage} />
          <ProtectedRoute path="/target" component={TargetPage} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/favicon" component={FavIconPage} />
          <Route component={Error404Page} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  ClearTokenAction: () => dispatch(ClearTokenAction()),
  ClearStoreAction: () => dispatch(ClearStoreAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuRouter);
