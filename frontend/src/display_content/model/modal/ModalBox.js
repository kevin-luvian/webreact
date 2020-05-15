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
  TextField
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const listAccount = ["Cash", "Bank", "Savings"];
const listCategory = ["Food", "Beverage", "Utility"];

class ModalBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      listAccount: listAccount,
      listCategory: listCategory,
      selectedType: this.props.type,
      selectedDate: this.props.date,
      selectedCategory: this.props.category,
      selectedAccount: this.props.account,
      filledName: this.props.name,
      filledValue: this.props.value
    };
    this.baseState = this.state;
  }

  resetState() {
    this.setState(this.baseState);
  }

  handleShow = (name, category, date, type, value, account) => {
    this.setState({
      selectedType: type,
      selectedDate: date,
      selectedCategory: category,
      selectedAccount: account,
      filledName: name,
      filledValue: value,
      open: true
    });
  };

  handleOpen = () => {
    this.resetState();
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleAccountChange = e => {
    console.log(e.target.value);
    this.setState({
      selectedAccount: e.target.value
    });
  };

  handleDateChange = e => {
    this.setState({
      selectedDate: e
    });
  };

  handleNameChange = e => {
    this.setState({
      filledName: e.target.value
    });
  };

  handleCategoryChange = e => {
    this.setState({
      selectedCategory: e.target.value
    });
  };

  handleValueChange = e => {
    this.setState({
      filledValue: e.target.value
    });
  };

  handleExpenseClick = () => {
    this.setState({
      selectedType: true
    });
  };

  handleIncomeClick = () => {
    this.setState({
      selectedType: false
    });
  };

  handleSubmit = () => {
    console.log("emit submit >>");
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
            timeout: 500
          }}
          style={{
            overflowY: "scroll",
            height: "100%",
            display: "block"
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
                className="col-10 mx-auto my-4"
                noValidate
                autoComplete="off"
              >
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
                <FormControl className="w-100 mt-4">
                  <InputLabel>Account</InputLabel>
                  <Select
                    value={this.state.selectedAccount}
                    onChange={this.handleAccountChange}
                  >
                    {this.state.listAccount.map((value, index) => {
                      return (
                        <MenuItem key={index} value={value}>
                          {value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
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
                      "aria-label": "change date"
                    }}
                  />
                </MuiPickersUtilsProvider>
                <FormControl className="w-100 mt-4">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={this.state.selectedCategory}
                    onChange={this.handleCategoryChange}
                  >
                    {this.state.listCategory.map((value, index) => {
                      return (
                        <MenuItem key={index} value={value}>
                          {value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
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
                    startAdornment: (
                      <InputAdornment position="start">Rp</InputAdornment>
                    )
                  }}
                  onChange={this.handleValueChange}
                />
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

export default ModalBox;
