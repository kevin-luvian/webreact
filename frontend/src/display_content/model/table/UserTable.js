import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CustomToolbar from "./CustomToolbar";
import axios from "../../../backend/axios/Axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import ModalUser from "../modal/ModalUser";
import ModalSecureDelete from "../modal/ModalSecureDelete";

class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      data: [],
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    await axios
      .get("/api/user/all")
      .then((response) => {
        console.log("API USER ALL",response.data.payload);
        this.setState({
          data: response.data.payload,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log("ERROR >>",error);
        this.setState({
          isLoading: false,
        });
      });
  };

  handleToolbarClick = () => {
    this.refs.modalAdd.handleShow("", "", "", "User");
  };

  handleEditClick = (rowData) => {
    this.refs.modalEdit.handleShow(rowData[0], rowData[1], "", rowData[2][0]);
  };

  handleDeleteClick = (rowData) => {
    this.refs.modalDelete.handleShow(rowData[0], rowData[1]);
  };

  handleAdd = async (data) => {
    await axios
      .post("/api/user", this.parseData(data))
      .then(() => {
        this.refs.modalAdd.handleClose();
        this.fetchUsers();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  handleEdit = async (data) => {
    await axios
      .put("/api/user", this.parseData(data))
      .then(() => {
        this.refs.modalEdit.handleClose();
        this.fetchUsers();
      })
      .catch((error) => {
        console.log("Error message", error.response.data.message);
        this.refs.modalEdit.handleError();
      });
  };

  handleDelete = async (data) => {
    await axios
      .delete("/api/user", { data: data })
      .then(() => {
        this.fetchUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  parseData = (data) => {
    return {
      adminPassword: data.adminPassword,
      id: data.id,
      username: data.name,
      password: data.password,
      role: data.role,
    };
  };

  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiGridListTile: {
          root: {
            width: "100% !important",
          },
        },
        MUIDataTableHeadCell: {
          root: {
            zIndex: "0 !important",
            fontWeight: "bold",
          },
        },
        MuiTableCell: {
          footer: {
            paddingLeft: "0px !important",
            paddingRight: "0px !important",
          },
        },
      },
    });

  render() {
    const columns = [
      {
        name: "id",
        options: {
          display: "false",
        },
      },
      {
        name: "username",
        label: "Username",
        options: {
          sort: false,
          setCellHeaderProps: (value) => ({ style: { textAlign: "center" } }),
          customBodyRender: (value, tableMeta, updateValue) => {
            return <p className="mb-0 text-center">{value}</p>;
          },
        },
      },
      {
        name: "roles",
        label: "Roles",
        options: {
          sort: false,
          setCellHeaderProps: (value) => ({ style: { textAlign: "center" } }),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <div className="text-center">
                {value.map((role, index) => {
                  return <p style={{margin:"0"}} key={index}>{role}</p>;
                })}
              </div>
            );
          },
        },
      },
      {
        name: "key",
        label: "Action",
        options: {
          sort: false,
          searchable: false,
          empty: true,
          setCellHeaderProps: (value) => ({ style: { textAlign: "center" } }),
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
                      transform: "translate(7%, 8%)",
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
          },
        },
      },
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
            : "Sorry, no matching records found",
        },
      },
      customSort: (data, colIndex, order) => {
        if (colIndex === 1) {
          if (order === "desc") {
            data.sort(function (x, y) {
              return x.data[1].title.localeCompare(y.data[1].title);
            });
          } else {
            data.sort(function (x, y) {
              return y.data[1].title.localeCompare(x.data[1].title);
            });
          }
        } else {
          if (order === "desc") {
            data.sort(function (x, y) {
              return x.data[colIndex].localeCompare(y.data[colIndex]);
            });
          } else {
            data.sort(function (x, y) {
              return y.data[colIndex].localeCompare(x.data[colIndex]);
            });
          }
        }
        return data;
      },
      fixedHeaderOptions: {
        xAxis: false,
        yAxis: true,
      },
      customToolbar: () => {
        return (
          <CustomToolbar
            title="New Transaction"
            onClick={this.handleToolbarClick}
          />
        );
      },
    };

    return (
      <React.Fragment>
        <ModalUser
          ref="modalAdd"
          modalTitle="Create User"
          onSubmit={this.handleAdd}
        />
        <ModalUser
          ref="modalEdit"
          isEdit={true}
          modalTitle="Edit User"
          onSubmit={this.handleEdit}
        />
        <ModalSecureDelete
          ref="modalDelete"
          modalTitle="Delete User"
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
              title={"User Data"}
              data={this.state.data}
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

export default UserTable;
