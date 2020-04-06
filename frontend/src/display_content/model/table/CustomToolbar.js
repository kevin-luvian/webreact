import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

const defaultToolbarStyles = {
  iconButton: {}
};

class CustomToolbar extends React.Component {
  handleClick = () => {
    this.props.onClick();
  };

  render() {
    return (
      <React.Fragment>
        <Tooltip title={this.props.title}>
          <IconButton className="on-hover-blue" onClick={this.handleClick}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(
  CustomToolbar
);
