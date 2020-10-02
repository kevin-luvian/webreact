import React, { Component } from "react";
import $ from "jquery";
import {
  Modal,
  Backdrop,
  InputLabel,
  MenuItem,
  FormControl,
  InputAdornment,
  Select,
  Fade,
  TextField,
} from "@material-ui/core";
import { rand6Char } from "../../../backend/function/Function";

class ModalTarget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: "",
      name: "",
      value: 0,
      account: "",
      category: "",
      error_message: "",
    };
    this.baseState = this.state;
  }

  resetState() {
    this.setState(this.baseState);
  }

  resetError = () => {
    this.handleError("", false);
  };

  handleError = (error_message = "", show = true) => {
    this.setState({ error_message: error_message });
    if (show) {
      $("#" + this.state.id).slideDown();
    } else {
      $("#" + this.state.id).slideUp();
    }
  };

  handleShow = (
    account_param = "",
    category_param = "",
    id_param = rand6Char(),
    name_param = "",
    value_param = 0
  ) => {
    this.setState({
      open: true,
      id: id_param,
      name: name_param,
      value: value_param,
      account: account_param,
      category: category_param,
    });
  };

  handleOpen = () => {
    this.resetState();
    this.setState({ open: true });
  };

  handleClose = () => {
    this.resetError("fast");
    this.setState({ open: false });
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleValueChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleAccountChange = (e) => {
    this.setState({ account: e.target.value });
  };

  handleCategoryChange = (e) => {
    this.setState({ category: e.target.value });
  };

  handleSubmit = () => {
    const payload = {
      id: this.state.id,
      name: this.state.name,
      value: this.state.value,
      categoryId: this.state.category,
      accountId: this.state.account,
    };
    this.props.onSubmit(payload);
  };

  render() {
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
                <form
                  className="col-10 mx-auto my-4"
                  noValidate
                  autoComplete="off"
                >
                  <div
                    id={this.state.id}
                    className="error-container mb-4"
                    style={{ display: "none", marginBottom: "0" }}
                  >
                    <p style={{ margin: "0" }}>{this.state.error_message}</p>
                  </div>

                  <TextField
                    className="w-100"
                    label="Name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                  />

                  <TextField
                    className="w-100 mt-4"
                    label="Value"
                    type="number"
                    value={this.state.value}
                    InputProps={{
                      inputProps: {
                        min: "0",
                        step: "1000",
                      },
                      startAdornment: (
                        <InputAdornment position="start">Rp</InputAdornment>
                      ),
                    }}
                    onChange={this.handleValueChange}
                  />

                  <FormControl className="w-100 mt-4">
                    <InputLabel>Account</InputLabel>
                    <Select
                      value={this.state.account}
                      onChange={this.handleAccountChange}
                    >
                      {this.props.accountList.map((value, index) => {
                        return (
                          <MenuItem key={index} value={value.id}>
                            {value.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>

                  <FormControl className="w-100 mt-4">
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={this.state.category}
                      onChange={this.handleCategoryChange}
                    >
                      {this.props.categoryList.map((value, index) => {
                        return (
                          <MenuItem key={index} value={value.id}>
                            {value.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </form>

                <button
                  className="btn-modal btn-modal-theme float-right mt-4"
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

export default ModalTarget;
