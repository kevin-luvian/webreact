import React, { Component } from "react";
import { connect } from "react-redux";
import Error404Page from "./error/Error404Page";
import Navbar from "../model/navbar/Navbar";
import UserTable from "../model/table/UserTable";

const navigation = {
  title: "User Management",
  history: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "User Management",
      href: "",
    },
  ],
};

class UserManagenentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  checkRoles = () => {
    return this.props.user.roles.includes("ROLE_ADMIN");
  };

  render() {
    return (
      <React.Fragment>
        {this.checkRoles() ? (
          <Navbar navigationLink={navigation}>
            <div className="col-12 px-0 mt-4">
              <UserTable />
            </div>
          </Navbar>
        ) : (
          <Error404Page />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(UserManagenentPage);
