import React from "react";
import {IconButton, Tooltip} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import ModalBox from "../modal/ModalBox";

const defaultToolbarStyles = {
  iconButton: {}
};

const modalProps = {
  account: "",
  type: true,
  date: new Date(),
  category: "",
  name: "",
  value: 0
}

class CustomToolbar extends React.Component {
  handleClick = () => {
    this.refs.modal.handleOpen();
  };

  render() {
    return (
      <React.Fragment>
        <ModalBox ref="modal" {...modalProps} modalTitle="Create Transaction" />
        <Tooltip title={"New Transaction"}>
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
