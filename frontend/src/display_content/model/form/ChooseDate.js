import React, { Component } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ScaleLoader from "react-spinners/ScaleLoader";

class ChooseDate extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedDate: this.props.startDate };
  }

  handleDateChange = e => {
    this.setState({
      selectedDate: e
    });
  };

  handleSubmit = () => {
    this.props.handleSubmit(this.state.selectedDate);
  };

  render() {
    return (
      <React.Fragment>
        {this.props.isLoading ? (
          <div className="card shadow" style={{ minHeight: "88px" }}>
            <div className="center mx-auto">
              <ScaleLoader color={"#8914fe"} height={40} width={5} margin={5} />
            </div>
          </div>
        ) : (
          <div className="card shadow">
            <div className="card-body row">
              <div className="col-12 col-sm-9">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    className="w-100 m-0"
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Choose a start date"
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div className="col-12 col-sm-3">
                <button
                  className="btn-modal-submit btn-date-sm-submit"
                  onClick={this.handleSubmit}
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default ChooseDate;
