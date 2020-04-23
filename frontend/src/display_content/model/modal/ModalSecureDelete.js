import React, { Component } from "react";
import { Modal, Backdrop, Fade, TextField } from "@material-ui/core";
import axios from "../../../backend/axios/Axios";

class ModalSecureDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: "",
      name: "",
      filledPassword: "",
      isError: false,
    };
  }

  handleShow = (id, name) => {
    this.setState({
      id: id,
      name: name,
      filledPassword: "",
    });
    this.handleOpen();
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      filledPassword: e.target.value,
      isError: false,
    });
  };

  handleSubmit = async () => {
    if (await this.validate()) {
      this.props.onSubmit(this.state.id);
      this.handleClose();
    } else {
      this.setState({
        isError: true,
      });
      console.log("cannot submit");
    }
  };

  validate = () => {
    return axios
      .post("/auth/validate-admin", { password: this.state.filledPassword })
      .then(() => {
        console.log("WTF");
        return true;
      })
      .catch((error) => {
        return false;
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
                <div className="col-12 mt-4">
                  <p className="mb-0">
                    <small
                      className={
                        this.state.isError ? "color-crimson" : "text-muted"
                      }
                    >
                      enter password to delete "{this.state.name}"
                    </small>
                  </p>
                  <TextField
                    className="w-100 m-0"
                    error={this.state.isError}
                    helperText={
                      this.state.isError ? "password is incorrect" : " "
                    }
                    value={this.state.filledPassword}
                    onChange={this.handlePasswordChange}
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

export default ModalSecureDelete;
