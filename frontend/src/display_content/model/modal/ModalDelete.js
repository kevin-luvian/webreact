import React, { Component } from "react";
import { Modal, Backdrop, Fade, TextField } from "@material-ui/core";

class ModalBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: this.props.id,
      name: this.props.name,
      filledName: "",
      isError: false
    };
  }

  handleShow = (name, id) => {
    this.setState({
      name: name,
      id: id,
      filledName: "",
      open: true
    });
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleNameChange = e => {
    this.setState({
      filledName: e.target.value,
      isError: false
    });
  };

  handleSubmit = () => {
    if (this.validate()) {
      console.log("emit submit >>");
    } else {
      this.setState({
        isError: true
      });
      console.log("cannot submit");
    }
  };

  validate = () => {
    if (this.state.filledName && this.state.filledName === this.state.name) {
      return true;
    }
    return false;
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
                <div className="col-12 mt-4">
                  <p className="mb-0">
                    <small className={this.state.isError ? "color-crimson": "text-muted"}>
                      enter "{this.state.name}" to continue
                    </small>
                  </p>
                  <TextField
                    className="w-100 m-0"
                    error={this.state.isError}
                    helperText=""
                    value={this.state.filledName}
                    onChange={this.handleNameChange}
                  />
                </div>
              </div>
              <button
                className="btn-modal-crimson float-right mt-4"
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
