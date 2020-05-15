import React, { Component } from "react";
import { Modal, Backdrop, Fade, TextField } from "@material-ui/core";

class ModalUtil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: this.props.id,
      filledName: this.props.name,
      filledColor: this.props.color
    };
    this.baseState = this.state;
  }

  resetState() {
    this.setState(this.baseState);
  }

  handleShow = (id, name, color) => {
    this.setState({
      id: id,
      filledName: name,
      filledColor: color,
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

  handleNameChange = e => {
    this.setState({ filledName: e.target.value });
  };

  handleColorChange = e => {
    this.setState({ filledColor: e.target.value });
  };

  handleSubmit = () => {
    this.props.onSubmit({
      id: this.state.id,
      name: this.state.filledName,
      color: this.state.filledColor
    });
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
                className="col-10 mx-auto mt-2 mb-4"
                noValidate
                autoComplete="off"
              >
                <TextField
                  className="w-100 mt-4"
                  error={false}
                  label="Name"
                  value={this.state.filledName}
                  onChange={this.handleNameChange}
                />
                <TextField
                  className="w-100 mt-4"
                  error={false}
                  label="Color"
                  value={this.state.filledColor}
                  onChange={this.handleColorChange}
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

export default ModalUtil;
