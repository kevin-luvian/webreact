import React, { Component } from "react";
import {
  Modal,
  Backdrop,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Fade,
  TextField,
} from "@material-ui/core";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      passwordError: false,
      nameError: false,
      newPasswordError: false,
      id: "",
      filledName: "",
      filledPassword: "",
      filledNewPassword: "",
      selectedRole: [],
    };
    this.baseState = this.state;
  }

  resetState() {
    this.setState(this.baseState);
  }

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

  handleError = () => {
    this.setState({ passwordError: true });
  };

  handleNameChange = (e) => {
    this.setState({ filledName: e.target.value, nameError: false });
  };

  handlePasswordChange = (e) => {
    this.setState({ filledPassword: e.target.value, passwordError: false });
  };

  handleNewPasswordChange = (e) => {
    this.setState({
      filledNewPassword: e.target.value,
      newPasswordError: false,
    });
  };

  handleRoleChange = (e) => {
    this.setState({ selectedRole: e.target.value });
  };

  handleSubmit = () => {
    if (!this.checkInputError()) {
      this.props.onSubmit({
        id: this.state.id,
        name: this.state.filledName,
        password: this.state.filledPassword,
        newPassword: this.state.filledNewPassword,
        role: this.state.selectedRole,
      });
    }
  };

  checkInputError = () => {
    let nameError = false;
    let newPasswordError = false;
    let passwordError = false;
    if (this.state.filledName === "") {
      nameError = true;
    }
    if (this.state.filledPassword === "") {
      passwordError = true;
    }
    if (this.state.filledNewPassword === "" && this.props.isEdit) {
      newPasswordError = true;
    }
    this.setState({
      nameError: nameError,
      passwordError: passwordError,
      newPasswordError: newPasswordError,
    });
    return nameError || passwordError || newPasswordError;
  };

  render() {
    const roles = ["User", "Admin"];
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
            <div className="col-11 col-sm-8 col-md-6 col-xl-5 card mx-auto p-4 my-4">
              <div className="row mx-3">
                <h5 className="col-8 m-0">{this.props.modalTitle}</h5>
                <i
                  className="col-4 fa fa-close text-right my-auto i-modal-close"
                  onClick={this.handleClose}
                />
              </div>
              <form
                className="col-10 mx-auto mt-2 mb-4"
                noValidate
                autoComplete="off"
              >
                <TextField
                  className="w-100 mt-4"
                  label="Name"
                  error={this.state.nameError}
                  value={this.state.filledName}
                  onChange={this.handleNameChange}
                />
                <TextField
                  className="w-100 mt-4"
                  error={this.state.passwordError}
                  label="Password"
                  value={this.state.filledPassword}
                  onChange={this.handlePasswordChange}
                />
                {this.props.isEdit && (
                  <TextField
                    className="w-100 mt-4"
                    error={this.state.newPasswordError}
                    label="New Password"
                    value={this.state.filledNewPassword}
                    onChange={this.handleNewPasswordChange}
                  />
                )}
                <FormControl className="w-100 mt-4">
                  <InputLabel>Roles</InputLabel>
                  <Select
                    value={this.state.selectedRole}
                    onChange={this.handleRoleChange}
                  >
                    {roles.map((role, index) => {
                      return (
                        <MenuItem key={index} value={role}>
                          {role}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </form>
              <button
                className="btn-modal-submit float-right mt-4"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </div>
          </Fade>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ModalUser;
