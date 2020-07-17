import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CustomToolbar from "./CustomToolbar";
import ModalTransaction from "../modal/ModalTransaction";
import ModalDelete from "../modal/ModalDelete";
import axios from "../../../backend/axios/Axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import { connect } from "react-redux";
import {
  Checkbox,
  Select,
  MenuItem,
  FormLabel,
  FormGroup,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleAdd = async (data) => {
    axios
      .post("/api/transaction", data)
      .then((response) => {
        this.refs.modalAdd.handleClose();
        this.props.reload();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  handleEdit = async (data) => {
    axios
      .put("/api/transaction", data)
      .then((response) => {
        this.refs.modalEdit.handleClose();
        this.props.reload();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  handleDelete = async (data) => {
    axios
      .delete("/api/transaction", { data: data })
      .then((response) => {
        this.refs.modalDelete.handleClose();
        this.props.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getAccounts = () => {
    var data = this.props.data;
    let res = [];
    for (let i = 0; i < data.length; i++) {
      if (!res.includes(data[i].accountModel.name))
        res.push(data[i].accountModel.name);
    }
    return res;
  };

  getCategories = () => {
    var data = this.props.data;
    let res = [];
    for (let i = 0; i < data.length; i++) {
      if (!res.includes(data[i].categoryModel.name))
        res.push(data[i].categoryModel.name);
    }
    return res;
  };

  handleEditClick = (rowData) => {
    this.refs.modalEdit.handleShow(
      rowData[0],
      rowData[1],
      rowData[2].id,
      rowData[3].id,
      this.parseToDate(rowData[4]),
      rowData[5],
      rowData[6]
    );
  };

  handleDeleteClick = (rowData) => {
    this.refs.modalDelete.handleShow(rowData[0], rowData[1]);
  };

  handleToolbarClick = () => {
    this.refs.modalAdd.handleShow(
      "",
      "",
      this.props.defaultAccount || this.props.default.account,
      this.props.default.category,
      this.props.currentDate,
      true,
      0
    );
  };

  parseToDate = (dateStr) => {
    let dateArr = dateStr.split("-");
    return new Date(dateArr[0], parseInt(dateArr[1]) - 1, dateArr[2]);
  };

  parseDataDownload = (data) => {
    for (let i = 0; i < data.length; i++) {
      data[i].data[2] = data[i].data[2].name;
      data[i].data[3] = data[i].data[3].name;
    }
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
        MUIDataTable: {
          responsiveScrollMaxHeight: {
            maxHeight: "69vh !important",
          },
        },
        MuiTypography: {
          h6: {
            fontFamily: "Lato, sans-serif",
            fontSize: "18px !important",
            fontWeight: "600",
          },
        },
      },
    });

  render() {
    const columns = [
      {
        name: "id",
        options: {
          display: false,
          filter: false,
        },
      },
      {
        name: "name",
        label: "Name",
        options: {
          filter: false,
          sort: true,
          setCellHeaderProps: (value) => ({ style: { textAlign: "center" } }),
        },
      },
      {
        name: "accountModel",
        label: "Account",
        options: {
          sort: true,
          searchable: false,
          setCellHeaderProps: (value) => ({
            style: { textAlign: "center", minWidth: "100px" },
          }),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <p className="text-muted text-nowrap m-0">
                <i
                  className={"fa fa-" + value.favIcon}
                  style={{ color: "gray" }}
                />
                {" " + value.name}
              </p>
            );
          },
          filter: true,
          filterType: "custom",
          filterOptions: {
            logic: (item, filters) => {
              if (filters.length) return !filters.includes(item.name);
              return false;
            },
            display: (filterList, onChange, index, column) => {
              let accountsOption = this.getAccounts();
              return (
                <React.Fragment>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Account</FormLabel>
                    <FormGroup>
                      {accountsOption.map((account, idx) => {
                        return (
                          <FormControlLabel
                            key={idx}
                            className="ml-0"
                            control={
                              <Checkbox
                                value={account}
                                checked={filterList[index].includes(account)}
                                onClick={(event) => {
                                  if (event.target.checked)
                                    filterList[index].push(event.target.value);
                                  else
                                    filterList[index].splice(
                                      filterList[index].indexOf(account),
                                      1
                                    );
                                  onChange(filterList[index], index, column);
                                }}
                              />
                            }
                            label={account}
                          />
                        );
                      })}
                    </FormGroup>
                  </FormControl>
                </React.Fragment>
              );
            },
          },
        },
      },
      {
        name: "categoryModel",
        label: "Category",
        options: {
          sort: true,
          searchable: false,
          setCellHeaderProps: (value) => ({ style: { textAlign: "center" } }),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <p
                style={{
                  margin: "0",
                  borderRadius: "15px",
                  borderLeft: "2px solid " + value.color,
                  paddingLeft: "15px",
                }}
              >
                {value.name}
              </p>
            );
          },
          filter: true,
          filterType: "custom",
          filterOptions: {
            logic: (item, filters) => {
              if (filters.length) return !filters.includes(item.name);
              return false;
            },
            display: (filterList, onChange, index, column) => {
              const categoriesOption = this.getCategories();
              return (
                <React.Fragment>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Category</FormLabel>
                    <FormGroup>
                      {categoriesOption.map((category, idx) => {
                        return (
                          <FormControlLabel
                            key={idx}
                            className="ml-0"
                            control={
                              <Checkbox
                                value={category}
                                checked={filterList[index].includes(category)}
                                onClick={(event) => {
                                  if (event.target.checked)
                                    filterList[index].push(event.target.value);
                                  else
                                    filterList[index].splice(
                                      filterList[index].indexOf(category),
                                      1
                                    );
                                  onChange(filterList[index], index, column);
                                }}
                              />
                            }
                            label={category}
                          />
                        );
                      })}
                    </FormGroup>
                  </FormControl>
                </React.Fragment>
              );
            },
          },
        },
      },
      {
        name: "date",
        label: "Date",
        options: {
          sort: true,
          filter: false,
          searchable: false,
          setCellHeaderProps: (value) => ({ style: { textAlign: "center" } }),
          customBodyRender: (value, tableMeta, updateValue) => {
            let date = value.split("-");
            return (
              <p className="mb-0">{[date[1], date[2], date[0]].join("/")}</p>
            );
          },
        },
      },
      {
        name: "type",
        label: "Type",
        options: {
          sort: false,
          searchable: false,
          setCellHeaderProps: (value) => ({ style: { textAlign: "center" } }),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                {value ? (
                  <p className="text-rounded bg-crimson mb-0">expense</p>
                ) : (
                  <p className="text-rounded bg-myblue mb-0">income</p>
                )}
              </React.Fragment>
            );
          },
          filter: true,
          filterType: "custom",
          filterOptions: {
            logic: (type, filters) => {
              if (filters.includes("Expenses")) return !type;
              else if (filters.includes("Incomes")) return type;
              return false;
            },
            display: (filterList, onChange, index, column) => {
              const optionValues = ["Expenses", "Incomes"];
              return (
                <React.Fragment>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Type</FormLabel>
                    <FormGroup>
                      <Select
                        value={filterList[index]}
                        onChange={(event) => {
                          filterList[index][0] = event.target.value;
                          onChange(filterList[index], index, column);
                        }}
                      >
                        {optionValues.map((value, index) => {
                          return (
                            <MenuItem key={index} value={value}>
                              {value}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormGroup>
                  </FormControl>
                </React.Fragment>
              );
            },
          },
        },
      },
      {
        name: "value",
        label: "Value",
        options: {
          filter: false,
          sort: false,
          searchable: false,
          setCellHeaderProps: (value) => ({ style: { textAlign: "center" } }),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <p className="text-center mb-0" style={{ minWidth: "80px" }}>
                  <span className="font-weight-bold">Rp </span>
                  {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "key",
        label: "Action",
        options: {
          filter: false,
          sort: false,
          searchable: false,
          download: false,
          empty: true,
          setCellHeaderProps: (value) => ({ style: { textAlign: "center" } }),
          customBodyRender: (value, tableMeta, updateValue) => {
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
      filterType: "checkbox",
      selectableRows: "none",
      print: false,
      viewColumns: false,
      onDownload: (buildHead, buildBody, columns, data) => {
        this.parseDataDownload(data);
        return buildHead(columns) + buildBody(data);
      },
      //responsive: "scrollMaxHeight",scrollFullHeight
      responsive: "scrollMaxHeight",
      customSort: (data, colIndex, order) => {
        if (colIndex === 2) {
          if (order === "desc") {
            data.sort(function (x, y) {
              return x.data[2].name.localeCompare(y.data[2].name);
            });
          } else {
            data.sort(function (x, y) {
              return y.data[2].name.localeCompare(x.data[2].name);
            });
          }
        } else if (colIndex === 3) {
          if (order === "desc") {
            data.sort(function (x, y) {
              return x.data[3].name.localeCompare(y.data[3].name);
            });
          } else {
            data.sort(function (x, y) {
              return y.data[3].name.localeCompare(x.data[3].name);
            });
          }
        } else if (colIndex === 4) {
          if (order === "desc") {
            data.sort((x, y) => {
              let date1 = this.parseToDate(x.data[4]);
              let date2 = this.parseToDate(y.data[4]);
              if (date1 > date2) return 1;
              else if (date1 < date2) return -1;
              else return 0;
            });
          } else {
            data.sort((x, y) => {
              let date1 = this.parseToDate(x.data[4]);
              let date2 = this.parseToDate(y.data[4]);
              if (date1 > date2) return -1;
              else if (date1 < date2) return 1;
              else return 0;
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
        <ModalTransaction
          ref="modalAdd"
          modalTitle="Create Transaction"
          accounts={this.props.accounts}
          categories={this.props.categories}
          onSubmit={this.handleAdd}
        />
        <ModalTransaction
          ref="modalEdit"
          modalTitle="Edit Transaction"
          accounts={this.props.accounts}
          categories={this.props.categories}
          onSubmit={this.handleEdit}
        />
        <ModalDelete
          ref="modalDelete"
          modalTitle="Delete Transaction"
          onSubmit={this.handleDelete}
        />
        {this.props.isLoading ? (
          <div className="card shadow" style={{ minHeight: "238px" }}>
            <div className="center mx-auto">
              <ScaleLoader color={"#8914fe"} height={70} width={5} margin={5} />
            </div>
          </div>
        ) : (
          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
              title={"Transaction Data"}
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

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(DataTable);
