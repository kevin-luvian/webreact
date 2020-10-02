import React, { Component } from "react";
import {
  Modal,
  Backdrop,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  Select,
  Fade,
  TextField,
  Input,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import $ from "jquery";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      errorMessage: "",
      id: "",
      showAdminPassword: false,
      showPassword: false,
      filledName: "",
      filledPassword: "",
      filledAdminPassword: "",
      selectedRole: "",
      filledNameError: { state: false, message: "" },
      filledPasswordError: { state: false, message: "" },
      filledAdminPasswordError: { state: false, message: "" },
      selectedRoleError: { state: false, message: "" },
    };
    this.baseState = this.state;
  }

  resetState() {
    this.setState(this.baseState);
  }

  toggleError = (message, state) => {
    this.setState({ errorMessage: message });
    if (state) {
      $("#errorContainer").slideDown("fast");
    } else {
      $("#errorContainer").slideUp("fast");
    }
  };

  checkInputError = () => {
    let isError = false;
    const emptyError = { state: true, message: "this field cannot be empty" };
    if (this.state.filledAdminPassword === "") {
      this.setState({ filledAdminPasswordError: emptyError });
      isError = true;
    }
    if (this.state.filledName === "") {
      this.setState({ filledNameError: emptyError });
      isError = true;
    }
    if (this.state.filledPassword === "") {
      this.setState({ filledPasswordError: emptyError });
      isError = true;
    }
    if (this.state.selectedRole === "") {
      this.setState({ selectedRoleError: emptyError });
      isError = true;
    }
    return isError;
  };

  resetError = () => {
    const noError = { state: false, message: "" };
    this.setState({ filledAdminPasswordError: noError });
    this.setState({ filledNameError: noError });
    this.setState({ filledPasswordError: noError });
    this.setState({ selectedRoleError: noError });
    this.toggleError("", false);
  };

  handleShow = (id, name, password, role) => {
    this.handleOpen();
    this.setState({
      id: id,
      filledName: name,
      filledPassword: password,
      selectedRole: role,
    });
  };

  handleOpen = () => {
    this.resetState();
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleNameChange = (e) => {
    this.setState({ filledName: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ filledPassword: e.target.value });
  };

  handleAdminPasswordChange = (e) => {
    this.setState({
      filledAdminPassword: e.target.value,
    });
  };

  handleRoleChange = (e) => {
    this.setState({ selectedRole: e.target.value });
  };

  handleSubmit = () => {
    this.resetError();
    if (!this.checkInputError()) {
      this.props.onSubmit({
        id: this.state.id,
        name: this.state.filledName,
        password: this.state.filledPassword,
        adminPassword: this.state.filledAdminPassword,
        role: this.state.selectedRole,
      });
    }
  };

  render() {
    const roles = [
      { display: "User", value: "ROLE_USER" },
      { display: "Admin", value: "ROLE_ADMIN" },
    ];
    return (
      <React.Fragment>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          style={{
            overflowY: "scroll",
            height: "100%",
            display: "block",
          }}
        >
          <Fade in={this.state.open}>
            <div
              style={{
                height: "100vh",
                display: "block",
                overflowY: "scroll",
              }}
            >
              <div className="col-11 col-sm-8 col-md-6 col-xl-5 card mx-auto p-4 my-4">
                <div className="row mx-3">
                  <h5 className="col-8 m-0">{this.props.modalTitle}</h5>
                  <i
                    className="col-4 fa fa-close text-right my-auto i-modal-close"
                    onClick={this.handleClose}
                  />
                </div>
                <div
                  id="errorContainer"
                  className="error-container"
                  style={{
                    display: "none",
                    marginBottom: "0",
                    marginTop: "25px",
                  }}
                >
                  <p style={{ margin: "0" }}>{this.state.errorMessage}</p>
                </div>
                <form
                  className="col-10 mx-auto mt-2 mb-4"
                  noValidate
                  autoComplete="off"
                >
                  <FormControl className="w-100 mt-4">
                    <InputLabel>Admin Password</InputLabel>
                    <Input
                      type={this.state.showAdminPassword ? "" : "password"}
                      value={this.state.filledAdminPassword}
                      error={this.state.filledAdminPasswordError.state}
                      helperText={this.state.filledAdminPasswordError.message}
                      onChange={this.handleAdminPasswordChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              this.setState({
                                showAdminPassword: !this.state
                                  .showAdminPassword,
                              });
                            }}
                          >
                            {this.state.showAdminPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <TextField
                    className="w-100 mt-4"
                    label="Name"
                    value={this.state.filledName}
                    error={this.state.filledNameError.state}
                    helperText={this.state.filledNameError.message}
                    onChange={this.handleNameChange}
                  />
                  <FormControl className="w-100 mt-4">
                    <InputLabel>Password</InputLabel>
                    <Input
                      type={this.state.showPassword ? "text" : "password"}
                      value={this.state.filledPassword}
                      error={this.state.filledPasswordError.state}
                      helperText={this.state.filledPasswordError.message}
                      onChange={this.handlePasswordChange}
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
                  <FormControl
                    className="w-100 mt-4"
                    error={this.state.selectedRoleError.state}
                  >
                    <InputLabel>Roles</InputLabel>
                    <Select
                      value={this.state.selectedRole}
                      onChange={this.handleRoleChange}
                    >
                      {roles.map((role, index) => {
                        return (
                          <MenuItem key={index} value={role.value}>
                            {role.display}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>
                      {this.state.selectedRoleError.message}
                    </FormHelperText>
                  </FormControl>
                </form>
                <button
                  className="btn-modal btn-modal-submit float-right mt-4"
                  onClick={this.handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </Fade>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ModalUser;
