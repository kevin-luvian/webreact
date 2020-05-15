import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../navbar/Navbar";

class AuthNavbarWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  authenticate = () => {
    return this.props.token && this.props.token.length !== 0;
  };

  render() {
    return (
      <React.Fragment>
        {this.authenticate() ? (
          <Navbar navigationLink={this.props.navigationLink}>
            {this.props.children}
          </Navbar>
        ) : (
          <div className="main-content" style={{minHeight:"100vh"}}>
            <div className="main-content-inner pb-3">{this.props.children}</div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(AuthNavbarWrapper);
