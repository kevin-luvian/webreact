import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CustomToolbar from "./CustomToolbar";
import ModalAccount from "../modal/ModalAccount";
import ModalDelete from "../modal/ModalDelete";
import axios from "../../../backend/axios/Axios";
import ScaleLoader from "react-spinners/ScaleLoader";

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      isLoading: true
      //data: [{ id: "aa", name: "bb", color: "cc" }]
    };
  }

  componentDidMount() {
    this.fetchAccounts();
  }

  fetchAccounts = async () => {
    await axios
      .get("/api/account/all")
      .then(response => {
        this.setState({
          //data: response.data.payload,
          isLoading: false
        });
        this.props.handleChange(response.data.payload);
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isError: true,
          isLoading: false
        });
      });
  };

  handleEditClick = rowData => {
    this.refs.modalEdit.handleShow(
      rowData[0],
      rowData[1],
      rowData[2],
      rowData[3]
    );
  };

  handleDeleteClick = rowData => {
    this.refs.modalDelete.handleShow(rowData[0], rowData[1]);
  };

  handleToolbarClick = () => {
    this.refs.modalAdd.handleShow("", "", "", "fa");
  };

  handleAdd = async data => {
    axios
      .post("/api/account", data)
      .then(response => {
        this.refs.modalAdd.handleClose();
        this.fetchAccounts();
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  handleEdit = async data => {
    await axios
      .put("/api/account", data)
      .then(response => {
        this.refs.modalEdit.handleClose();
        this.fetchAccounts();
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleDelete = async data => {
    await axios
      .delete("/api/account", { data: data })
      .then(response => {
        this.refs.modalDelete.handleClose();
        this.fetchAccounts();
      })
      .catch(error => {
        console.log(error);
      });
  };

  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiGridListTile: {
          root: {
            width: "100% !important"
          }
        },
        MUIDataTableHeadCell: {
          root: {
            zIndex: "0 !important",
            fontWeight: "bold"
          }
        },
        MuiTableCell: {
          footer: {
            paddingLeft: "0px !important",
            paddingRight: "0px !important"
          }
        }
      }
    });

  render() {
    const columns = [
      {
        name: "id",
        options: {
          display: "false"
        }
      },
      {
        name: "name",
        label: "Name",
        options: {
          sort: false,
          setCellHeaderProps: value => ({ style: { textAlign: "center" } }),
          customBodyRender: (value, tableMeta, updateValue) => {
            return <p className="mb-0 text-center">{value}</p>;
          }
        }
      },
      {
        name: "color",
        label: "Color",
        options: {
          sort: false,
          searchable: false,
          setCellHeaderProps: value => ({ style: { textAlign: "center" } }),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <p
                className="text-rounded mb-0 mx-auto"
                style={{
                  border: "2px solid " + value,
                  color: value,
                  maxWidth: "160px"
                }}
              >
                {value}
              </p>
            );
          }
        }
      },
      {
        name: "favIcon",
        label: "Icon",
        options: {
          sort: false,
          searchable: false,
          setCellHeaderProps: value => ({ style: { textAlign: "center" } }),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <div className="col text-center px-0">
                <i
                  className={"fa fa-" + value}
                  style={{ color: "gray", fontSize: "1.3rem" }}
                />
                <div className="col my-auto px-0">
                  <small className="m-0 text-center text-muted">{value}</small>
                </div>
              </div>
            );
          }
        }
      },
      {
        name: "key",
        label: "Action",
        options: {
          sort: false,
          searchable: false,
          empty: true,
          setCellHeaderProps: value => ({ style: { textAlign: "center" } }),
          customBodyRender: (value, tableMeta, updateValue) => {
            // console.log(tableMeta.rowData);
            return (
              <div className="text-center" style={{ minWidth: "100px" }}>
                <button
                  className="btn-action-edit mr-4 text-center"
                  onClick={() => {
                    this.handleEditClick(tableMeta.rowData);
                  }}
                >
                  <i
                    className="fa fa-edit"
                    style={{
                      fontSize: "1.1rem",
                      transform: "translate(7%, 8%)"
                    }}
                  />
                </button>
                <button
                  className="btn-action-delete"
                  onClick={() => {
                    this.handleDeleteClick(tableMeta.rowData);
                  }}
                >
                  <i
                    className="fa fa-trash-o"
                    style={{ fontSize: "1.1rem", transform: "translateY(5%)" }}
                  />
                </button>
              </div>
            );
          }
        }
      }
    ];

    const options = {
      print: false,
      filter: false,
      download: false,
      viewColumns: false,
      selectableRows: "none",
      responsive: "scrollMaxHeight",
      textLabels: {
        body: {
          noMatch: this.state.isError
            ? "Sorry, an error exception occured"
            : "Sorry, no matching records found"
        }
      },
      customSort: (data, colIndex, order) => {
        if (colIndex === 1) {
          if (order === "desc") {
            data.sort(function(x, y) {
              return x.data[1].title.localeCompare(y.data[1].title);
            });
          } else {
            data.sort(function(x, y) {
              return y.data[1].title.localeCompare(x.data[1].title);
            });
          }
        } else {
          if (order === "desc") {
            data.sort(function(x, y) {
              return x.data[colIndex].localeCompare(y.data[colIndex]);
            });
          } else {
            data.sort(function(x, y) {
              return y.data[colIndex].localeCompare(x.data[colIndex]);
            });
          }
        }
        return data;
      },
      fixedHeaderOptions: {
        xAxis: false,
        yAxis: true
      },
      customToolbar: () => {
        return (
          <CustomToolbar
            title="New Transaction"
            onClick={this.handleToolbarClick}
          />
        );
      }
    };

    return (
      <React.Fragment>
        <ModalAccount
          ref="modalAdd"
          modalTitle="Create Account"
          onSubmit={this.handleAdd}
        />
        <ModalAccount
          ref="modalEdit"
          modalTitle="Edit Account"
          onSubmit={this.handleEdit}
        />
        <ModalDelete
          ref="modalDelete"
          modalTitle="Delete Account"
          onSubmit={this.handleDelete}
        />
        {this.state.isLoading ? (
          <div className="card shadow" style={{ minHeight: "238px" }}>
            <div className="center mx-auto">
              <ScaleLoader color={"#8914fe"} height={70} width={5} margin={5} />
            </div>
          </div>
        ) : (
          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
              data={this.props.data}
              columns={columns}
              options={options}
              className="px-3 shadow"
            />
          </MuiThemeProvider>
        )}
      </React.Fragment>
    );
  }
}

export default DataTable;
