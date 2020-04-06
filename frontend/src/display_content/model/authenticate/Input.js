import React, { Component } from "react";
import PropTypes from "prop-types";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
      error: false
    };
  }

  handleFocus = () => {
    this.setState({
      isHover: true
    });
  };

  handleBlur = event => {
    if (!event.target.value) {
      this.setState({
        isHover: false
      });
    }
  };

  handleChange = event => {
    return event.target.value;
  };

  render() {
    const { id, ico, label, ...opts } = this.props;
    return (
      <React.Fragment>
        <div className={"form-gp " + (this.state.isHover ? "focused" : "")}>
          <label htmlFor={id} style={{ cursor: "text" }}>
            {label}
          </label>
          <input
            id={id}
            {...opts}
            onChange={this.props.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          <i className={ico}></i>
          <div className="text-danger"></div>
        </div>
      </React.Fragment>
    );
  }
}

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  handleError: PropTypes.func
};

export default Input;
