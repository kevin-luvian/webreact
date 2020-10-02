import React, { Component } from "react";
import { Modal, Backdrop, Fade } from "@material-ui/core";

class ModalTargetTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: "",
    };
    this.baseState = this.state;
  }

  resetState() {
    this.setState(this.baseState);
  }

  handleShow = (id_param = "") => {
    this.setState({
      open: true,
      id: id_param,
    });
  };

  handleOpen = () => {
    this.resetState();
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleContinue = () => {
    this.props.onSubmit(this.state.id);
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
                <h5 className="col-8 m-0">Finish Target</h5>
                <i
                  className="col-4 fa fa-close text-right my-auto i-modal-close"
                  onClick={this.handleClose}
                />
                <div className="col-12 mt-4">
                  <p className="mb-0">
                    <small className="text-muted">
                      continue to delete target and merge all transactions
                    </small>
                  </p>
                </div>
              </div>
              <button
                className="btn-modal btn-modal-theme float-right mt-4"
                onClick={this.handleContinue}
              >
                Continue
              </button>
            </div>
          </Fade>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ModalTargetTransaction;
