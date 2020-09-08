import React, { Component } from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import Navbar from "../model/navbar/Navbar";
import TargetCard from "../model/card/TargetCard";
import ModalTarget from "../model/modal/ModalTarget";

class TargetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyFetch: 0,
      searchParam: "",
    };
  }

  incrementKeyFetch = () => {
    this.setState({ keyFetch: this.state.keyFetch + 1 });
  };

  handleSearch = (e) => {
    this.setState({ searchParam: e.target.value });
  };

  showModalCreate = () => {
    this.refs.modalCreate.handleShow();
  };

  showModalAdd = () => {
    this.refs.modalAdd.handleShow();
  };

  showModalEdit = () => {
    this.refs.modalEdit.handleShow();
  };

  render() {
    const navigation = {
      title: "Target",
      history: [
        {
          title: "Home",
          href: "/",
        },
        {
          title: "Target",
          href: "",
        },
      ],
    };
    return (
      <Navbar navigationLink={navigation}>
        <ModalTarget ref="modalCreate" modalTitle="Create Target" />
        <ModalTarget ref="modalEdit" modalTitle="Edit Target" />
        <ModalTarget ref="modalAdd" modalTitle="Add Target" />
        <div
          className="my-5 shadow mx-auto"
          style={{
            display: "flex",
            borderRadius: "0.3rem",
            backgroundColor: "white",
            maxWidth: "600px",
          }}
        >
          <div className="col-10 pl-4 py-3">
            <TextField
              className="w-100"
              label="Search"
              value={this.state.searchParam}
              onChange={this.handleSearch}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <i
                      className="fa fa-search mr-2"
                      style={{ color: "rgba(0, 0, 0, 0.5)" }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <div className="row mt-3">{this.state.searchParam}</div>
          </div>
          <div className="btn-target-add col-2" onClick={this.showModalCreate}>
            <i
              className="fa fa-plus"
              style={{
                color: "white",
                fontSize: "2.5rem",
                transform: "translateY(75%)",
              }}
            />
          </div>
        </div>
        <div className="container">
          <TargetCard onAdd={this.showModalAdd} onEdit={this.showModalEdit} />
        </div>
      </Navbar>
    );
  }
}

export default TargetPage;
