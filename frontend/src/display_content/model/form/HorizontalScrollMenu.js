import React, { Component } from "react";

class HorizontalScrollMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueClicked: ""
    };
  }

  handleClick = value => {
    this.setState({
      valueClicked: value
    });
    this.props.handleScrollMenuChange(value);
  };

  render() {
    return (
      <div class="scrollmenu p-4">
        {this.props.menus.map((value, index) => {
          return (
            <button
              key={index}
              type="button"
              className={
                "shadow mr-3 " +
                (this.state.valueClicked === value
                  ? "btn-mywhite-focus"
                  : "btn-mywhite")
              }
              onClick={() => this.handleClick(value)}
            >
              <span className="font-weight-bold">{value}</span>
            </button>
          );
        })}
      </div>
    );
  }
}

export default HorizontalScrollMenu;
