import React, { Component } from "react";
import axios from "../../../backend/axios/Axios";
import Input from "./Input";
import { connect } from "react-redux";
import SetTokenAction from "../../../backend/redux/actions/SetTokenAction";
import SetUsernameAction from "../../../backend/redux/actions/SetUsernameAction";
import ClearTokenAction from "../../../backend/redux/actions/ClearTokenAction";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      username: "",
      password: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    };

    await axios.post("/auth/signin", data).then(
      response => {
        this.props.SetTokenAction(response.data.payload.token);
        this.props.SetUsernameAction(response.data.payload.username);
        this.setState({ redirect: true });
      },
      error => {
        console.log(error);
      }
    );
  };

  handleChangeUsername = event => {
    this.setState({
      username: event.target.value
    });
  };

  handleChangePassword = event => {
    this.setState({
      password: event.target.value
    });
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
        handleChange: this.handleChangeUsername.bind(this)
      },
      {
        id: "input-2",
        ico: "ti-lock",
        name: "password",
        label: "Password",
        type: "password",
        value: this.state.password,
        handleChange: this.handleChangePassword.bind(this)
      }
    ];

    let result = [];
    inputs.map((props, index) => result.push(<Input key={index} {...props} />));
    return result;
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        <div className="login-area">
          <div className="container">
            <div className="login-box">
              <form
                onSubmit={this.handleSubmit}
                ref={fm => {
                  this.form = fm;
                }}
              >
                <div className="login-form-head">
                  <h4>Sign In</h4>
                  <p>Hello there, Sign in and start managing your Finances</p>
                </div>
                <div className="login-form-body shadow">
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

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  SetTokenAction: payload => dispatch(SetTokenAction(payload)),
  SetUsernameAction: payload => dispatch(SetUsernameAction(payload)),
  ClearTokenAction: () => dispatch(ClearTokenAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
