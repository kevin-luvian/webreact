import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField, InputAdornment } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "../../backend/axios/Axios";
import Navbar from "../model/navbar/Navbar";
import TargetCard from "../model/card/TargetCard";
import ModalDelete from "../model/modal/ModalDelete";
import ModalTarget from "../model/modal/ModalTarget";
import ModalTargetEnd from "../model/modal/ModalTargetEnd";
import ModalTargetTransaction from "../model/modal/ModalTargetTransaction";

class TargetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyFetch: 0,
      searchParam: "",
      accounts: [],
      categories: [],
      targets: [],
      showTargets: [],
    };
  }

  componentDidMount = () => {
    this.fetchAccounts();
    this.fetchCategories();
    this.fetchTargets();
  };

  incrementKeyFetch = () => {
    this.setState({ keyFetch: this.state.keyFetch + 1 });
  };

  handleSearch = (e) => {
    this.setState({ searchParam: e.target.value }, this.handleTargetFilter);
  };

  handleTargetFilter = () => {
    const targets = this.state.targets;
    const search_param = this.state.searchParam.trim();
    let showTargets = [];
    if (search_param === "") {
      showTargets = targets;
    } else {
      for (let i = 0; i < targets.length; i++) {
        const target = targets[i];
        if (target.name.includes(search_param)) showTargets.push(target);
      }
    }
    this.setState({ showTargets: showTargets });
  };

  showModalCreate = () => {
    this.refs.modalCreate.handleShow(
      this.props.default.account,
      this.props.default.category
    );
  };

  showModalAdd = (target) => {
    this.refs.modalAdd.handleShow(target.id);
  };

  showModalEdit = (target) => {
    this.refs.modalEdit.handleShow(
      target.accountModel.id,
      target.categoryModel.id,
      target.id,
      target.name,
      target.value
    );
  };

  showModalDelete = (target) => {
    this.refs.modalDelete.handleShow(target.id, target.name);
  };

  showModalEnd = (target) => {
    this.refs.modalEnd.handleShow(target.id);
  };

  handleCreate = (payload) => {
    console.log("Create Payload", payload);
    axios
      .post("/api/target", payload)
      .then((response) => {
        this.fetchTargets();
        this.refs.modalCreate.handleClose();
        console.log("Target", response.data.payload);
      })
      .catch((error) => {
        if ("response" in error) {
          console.log("Error :", error.response.data.message);
          this.refs.modalCreate.handleError(error.response.data.message);
        }
      });
  };

  handleEdit = (payload) => {
    console.log("Edit Payload", payload);
    axios
      .put("/api/target", payload)
      .then((response) => {
        this.fetchTargets();
        this.refs.modalEdit.handleClose();
        console.log("Target", response.data.payload);
      })
      .catch((error) => {
        if ("response" in error) {
          console.log("Error :", error.response.data.message);
          this.refs.modalEdit.handleError(error.response.data.message);
        }
      });
  };

  handleAdd = (payload) => {
    console.log("Add Payload", payload);
    axios
      .post("/api/target/add", payload)
      .then((response) => {
        this.fetchTargets();
        this.refs.modalAdd.handleClose();
        console.log("Target", response.data.payload);
      })
      .catch((error) => {
        if ("response" in error) {
          console.log("Error :", error.response.data.message);
          this.refs.modalAdd.handleError(error.response.data.message);
        }
      });
  };

  handleDelete = async (payload) => {
    axios
      .delete("/api/target", { data: payload })
      .then((response) => {
        this.refs.modalDelete.handleClose();
        this.fetchTargets();
      })
      .catch((error) => {
        if ("response" in error) {
          console.log("Error :", error.response.data.message);
        }
      });
  };

  handleEnd = async (payload) => {
    axios
      .delete("/api/target/end", { data: payload })
      .then((response) => {
        this.refs.modalEnd.handleClose();
        this.fetchTargets();
      })
      .catch((error) => {
        if ("response" in error) {
          console.log("Error :", error.response.data.message);
        }
      });
  };

  fetchTargets = () => {
    axios
      .get("/api/target/all")
      .then((response) => {
        this.setState(
          {
            targets: response.data.payload,
          },
          this.handleTargetFilter
        );
        this.incrementKeyFetch();
        console.log("Target", response.data.payload);
      })
      .catch((error) => {
        if ("response" in error) {
          console.log("Error :", error.response.data.message);
        }
      });
  };

  fetchAccounts = () => {
    axios
      .get("/api/account/all")
      .then((response) => {
        this.setState({
          accounts: response.data.payload,
        });
        console.log("Accounts", response.data.payload);
      })
      .catch((error) => {
        if ("response" in error) {
          console.log("Error :", error.response.data.message);
        }
      });
  };

  fetchCategories = () => {
    axios
      .get("/api/category/all")
      .then((response) => {
        this.setState({
          categories: response.data.payload,
        });
        console.log("Categories", response.data.payload);
      })
      .catch((error) => {
        if ("response" in error) {
          console.log("Error :", error.response.data.message);
        }
      });
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
        <ModalTarget
          ref="modalCreate"
          modalTitle="Create Target"
          accountList={this.state.accounts}
          categoryList={this.state.categories}
          onSubmit={this.handleCreate}
        />
        <ModalTarget
          ref="modalEdit"
          modalTitle="Edit Target"
          accountList={this.state.accounts}
          categoryList={this.state.categories}
          onSubmit={this.handleEdit}
        />
        <ModalTargetTransaction
          ref="modalAdd"
          modalTitle="Add Target Transaction"
          onSubmit={this.handleAdd}
        />
        <ModalDelete
          ref="modalDelete"
          modalTitle="Delete Target"
          onSubmit={this.handleDelete}
        />
        <ModalTargetEnd ref="modalEnd" onSubmit={this.handleEnd} />
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
              className="w-100 mb-3"
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
          </div>
          <div className="btn-target-add col-2" onClick={this.showModalCreate}>
            <Tooltip title="create" arrow>
              <i
                className="fa fa-plus"
                style={{
                  color: "white",
                  fontSize: "2.5rem",
                  transform: "translateY(75%)",
                }}
              />
            </Tooltip>
          </div>
        </div>
        <div className="container">
          {this.state.showTargets.map((target, index) => {
            return (
              <TargetCard
                key={index}
                id={target.id}
                name={target.name}
                currentAmount={target.currentAmount}
                value={target.value}
                accountModel={target.accountModel}
                categoryModel={target.categoryModel}
                onAdd={() => {
                  this.showModalAdd(target);
                }}
                onEdit={() => {
                  this.showModalEdit(target);
                }}
                onDelete={() => {
                  this.showModalDelete(target);
                }}
                onEnd={() => {
                  this.showModalEnd(target);
                }}
              />
            );
          })}
        </div>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(TargetPage);
