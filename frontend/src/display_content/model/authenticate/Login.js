import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../../backend/axios/Axios";
import {
  InputLabel,
  FormControl,
  TextField,
  Input,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
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
      showPassword: false,
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

  handleChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
    this.toggleError(false);
  };

  handleChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
    this.toggleError(false);
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
                    className="text-link m-0"
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
                  <form
                    className="col-10 mx-auto mt-2 mb-4"
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      className="w-100"
                      label="Username"
                      value={this.state.username}
                      onChange={this.handleChangeUsername}
                    />
                    <FormControl className="w-100 mt-4">
                      <InputLabel>Password</InputLabel>
                      <Input
                        type={this.state.showPassword ? "" : "password"}
                        value={this.state.password}
                        onChange={this.handleChangePassword}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => {
                                this.setState({
                                  showPassword: !this.state.showPassword,
                                });
                              }}
                            >
                              {this.state.showPassword ? (
                                <Visibility />
                              ) : (
                                  <VisibilityOff />
                                )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </form>
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
