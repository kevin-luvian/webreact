import React, { Component } from "react";
import $ from "jquery";
import {
  Modal,
  Backdrop,
  InputAdornment,
  Fade,
  TextField,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { rand6Char } from "../../../backend/function/Function";

class ModalTargetTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: "",
      value: 0,
      date: null,
      error_message: "",
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

  handleShow = (
    id_param = rand6Char(),
    value_param = 0,
    date_param = new Date()
  ) => {
    this.setState({
      open: true,
      id: id_param,
      value: value_param,
      date: date_param,
    });
  };

  handleOpen = () => {
    this.resetState();
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleValueChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleDateChange = (date) => {
    this.setState({ date: date });
  };

  handleSubmit = () => {
    const payload = {
      targetId: this.state.id,
      amount: this.state.value,
      date: this.state.date,
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

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    className="w-100 mt-4 mb-0"
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={this.state.date}
                    onChange={this.handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </form>

              <button
                className="btn-modal btn-modal-theme float-right mt-4"
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

export default ModalTargetTransaction;
