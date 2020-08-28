import React, { Component } from "react";
import axios from "../../../backend/axios/Axios";
import Input from "./Input";
import { connect } from "react-redux";
import SetTokenAction from "../../../backend/redux/actions/SetTokenAction";
import SetUsernameAction from "../../../backend/redux/actions/SetUsernameAction";
import SetRolesAction from "../../../backend/redux/actions/SetRolesAction";
import ClearTokenAction from "../../../backend/redux/actions/ClearTokenAction";
import $ from "jquery";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  useGuestAccount = () => {
    this.setState({ username: "guest", password: "guestpass" });
  };

  toggleError = (state) => {
    if (state) {
      $("#errorContainer").slideDown();
    } else {
      $("#errorContainer").slideUp();
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    await axios.post("/auth/signin", data).then(
      (response) => {
        this.props.SetTokenAction(response.data.payload.token);
        this.props.SetUsernameAction(response.data.payload.username);
        this.props.SetRolesAction(response.data.payload.roles);
        this.props.history.push("/");
      },
      (error) => {
        console.log(error);
        this.toggleError(true);
      }
    );
  };

  handleChangeUsername = (username_param) => {
    this.setState({
      username: username_param,
    });
    this.toggleError(false);
  };

  handleChangePassword = (password_param) => {
    this.setState({
      password: password_param,
    });
    this.toggleError(false);
  };

  createInput = () => {
    const inputs = [
      {
        id: "input-1",
        ico: "ti-user",
        name: "username",
        label: "Username",
        type: "text",
        value: this.state.username,
        handleInputChange: this.handleChangeUsername,
      },
      {
        id: "input-2",
        ico: "ti-lock",
        name: "password",
        label: "Password",
        type: "password",
        value: this.state.password,
        handleInputChange: this.handleChangePassword,
      },
    ];

    let result = [];
    inputs.map((props, index) => result.push(<Input key={index} {...props} />));
    return result;
  };

  render() {
    return (
      <React.Fragment>
        <div className="login-area">
          <div className="container">
            <div className="login-box">
              <form
                onSubmit={this.handleSubmit}
                ref={(fm) => {
                  this.form = fm;
                }}
              >
                <div className="login-form-head">
                  <h4 style={{ margin: "10px" }}>Sign In</h4>
                  <p style={{ margin: "0" }}>
                    Hello there, Sign in and start managing your Finances
                  </p>
                  <p style={{ margin: "5px 0" }}>or</p>
                  <p
                    className="text-link"
                    style={{ margin: "0", width: "fit-content" }}
                    onClick={this.useGuestAccount}
                  >
                    use guest account
                  </p>
                </div>
                <div className="login-form-body shadow">
                  <div
                    id="errorContainer"
                    className="error-container"
                    style={{ display: "none" }}
                  >
                    <p style={{ margin: "0" }}>invalid username or password</p>
                  </div>
                  {this.createInput()}
                  <div className="submit-btn-area">
                    <button id="form_submit" type="submit">
                      Submit <i className="ti-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  SetTokenAction: (payload) => dispatch(SetTokenAction(payload)),
  SetUsernameAction: (payload) => dispatch(SetUsernameAction(payload)),
  SetRolesAction: (payload) => dispatch(SetRolesAction(payload)),
  ClearTokenAction: () => dispatch(ClearTokenAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
