import React, { Component } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import { connect } from "react-redux";
import SetDefaultAction from "../../../backend/redux/actions/SetDefaultAction";

class DefaultSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAccount: this.props.default.account,
      selectedCategory: this.props.default.category
    };
  }

  handleAccountChange = event => {
    this.setState({
      selectedAccount: event.target.value
    });
  };

  handleCategoryChange = event => {
    this.setState({
      selectedCategory: event.target.value
    });
  };

  handleSubmit = () => {
    console.log({
      selectedAccount: this.state.selectedAccount,
      selectedCategory: this.state.selectedCategory
    });
    this.props.SetDefaultAction({
      account: this.state.selectedAccount,
      category: this.state.selectedCategory
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="card shadow">
          <div className="card-body py-4">
            <div className="col-12">
              <div className="row">
                <div className="col-3">
                  <h6 className="m-0 vertical-center">Account</h6>
                </div>
                <div className="col-9">
                  <FormControl className="w-100">
                    <Select
                      value={this.state.selectedAccount}
                      onChange={this.handleAccountChange}
                    >
                      <MenuItem value="none">None</MenuItem>
                      {this.props.listAccount.map((value, index) => {
                        return (
                          <MenuItem key={index} value={value.id}>
                            {value.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            <div
              className="col-12 my-4"
              style={{ border: "1px solid rgb(211, 211, 211, 0.5)" }}
            />
            <div className="col-12">
              <div className="row">
                <div className="col-3">
                  <h6 className="m-0 vertical-center">Category</h6>
                </div>
                <div className="col-9">
                  <FormControl className="w-100">
                    <Select
                      value={this.state.selectedCategory}
                      onChange={this.handleCategoryChange}
                    >
                      <MenuItem value="none">None</MenuItem>
                      {this.props.listCategory.map((value, index) => {
                        return (
                          <MenuItem key={index} value={value.id}>
                            {value.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="col-12 mt-5">
              <button
                className="btn-modal-submit w-100"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
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
  SetDefaultAction: payload => dispatch(SetDefaultAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultSettings);
