import React, { Component } from "react";
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
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import $ from "jquery";
import { rand6Char } from "../../../backend/function/Function";

class ModalTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error_message: "",
      id: this.props.id,
      selectedType: this.props.type,
      selectedDate: this.props.date,
      selectedCategory: this.props.category,
      selectedAccount: this.props.account,
      filledName: this.props.name,
      filledValue: this.props.value,
    };
    this.baseState = this.state;
  }

  resetState() {
    this.setState(this.baseState);
  }

  handleError = (error_message = "", show = true) => {
    this.setState({ error_message: error_message });
    if (show) {
      $("#" + this.state.id).slideDown();
    } else {
      $("#" + this.state.id).slideUp();
    }
  };

  handleShow = (id, name, account, category, date, type, value) => {
    this.setState({
      id: id === "" ? rand6Char() : id,
      selectedType: type,
      selectedDate: new Date(date),
      selectedCategory: category,
      selectedAccount: account,
      filledName: name,
      filledValue: value,
      open: true,
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

  handleAccountChange = (e) => {
    this.setState({
      selectedAccount: e.target.value,
    });
  };

  handleDateChange = (e) => {
    this.setState({
      selectedDate: e,
    });
  };

  handleNameChange = (e) => {
    this.setState({
      filledName: e.target.value,
    });
  };

  handleCategoryChange = (e) => {
    this.setState({
      selectedCategory: e.target.value,
    });
  };

  handleValueChange = (e) => {
    this.setState({
      filledValue: e.target.value,
    });
  };

  handleExpenseClick = () => {
    this.setState({
      selectedType: true,
    });
  };

  handleIncomeClick = () => {
    this.setState({
      selectedType: false,
    });
  };

  handleSubmit = () => {
    this.props.onSubmit({
      id: this.state.id,
      name: this.state.filledName,
      type: this.state.selectedType,
      value: this.state.filledValue,
      date: this.parseDate(this.state.selectedDate),
      categoryId: this.state.selectedCategory,
      accountId: this.state.selectedAccount,
    });
  };

  parseDate = (date) => {
    return [
      date.getFullYear(),
      ("0" + (date.getMonth() + 1)).slice(-2),
      ("0" + date.getDate()).slice(-2),
    ].join("-");
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

                  <div className="row w-100">
                    <div className="col-6 text-center">
                      <button
                        className={
                          this.state.selectedType
                            ? "btn-modal-type"
                            : "btn-modal-type-disabled"
                        }
                        type="button"
                        onClick={this.handleExpenseClick}
                      >
                        Expense
                      </button>
                    </div>
                    <div className="col-6 text-center">
                      <button
                        className={
                          !this.state.selectedType
                            ? "btn-modal-type"
                            : "btn-modal-type-disabled"
                        }
                        type="button"
                        onClick={this.handleIncomeClick}
                      >
                        Income
                      </button>
                    </div>
                  </div>

                  <TextField
                    className="w-100 mt-4"
                    error={false}
                    helperText=""
                    label="Item Name"
                    value={this.state.filledName}
                    onChange={this.handleNameChange}
                  />

                  <TextField
                    className="w-100 mt-4"
                    label="Value"
                    type="number"
                    value={this.state.filledValue}
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

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      className="w-100 mt-4 mb-0"
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Date picker inline"
                      value={this.state.selectedDate}
                      onChange={this.handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>

                  <FormControl className="w-100 mt-4">
                    <InputLabel>Account</InputLabel>
                    <Select
                      value={this.state.selectedAccount}
                      onChange={this.handleAccountChange}
                    >
                      {this.props.accounts.map((value, index) => {
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
                      value={this.state.selectedCategory}
                      onChange={this.handleCategoryChange}
                    >
                      {this.props.categories.map((value, index) => {
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

export default ModalTransaction;
