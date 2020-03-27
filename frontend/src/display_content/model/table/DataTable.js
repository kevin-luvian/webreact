import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CustomToolbar from "./CustomToolbar";
import ModalBox from "../modal/ModalBox";
import ModalDelete from "../modal/ModalDelete";
import {
  Checkbox,
  Select,
  MenuItem,
  FormLabel,
  FormGroup,
  FormControl,
  FormControlLabel
} from "@material-ui/core";

const options = {
  filterType: "checkbox",
  selectableRows: "none",
  print: false,
  viewColumns: false,
  responsive: "scrollMaxHeight",
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
    return <CustomToolbar />;
  }
};

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getCategories = () => {
    var data = this.props.data;
    let res = [];
    for (let i = 0; i < data.length; i++) {
      if (!res.includes(data[i].category.title))
        res.push(data[i].category.title);
    }
    return res;
  };

  handleEditClick = rowData => {
    this.refs.modalEdit.handleShow(
      rowData[0],
      rowData[1].title,
      rowData[2],
      rowData[3],
      rowData[4],
      rowData[5].title
    );
  };

  handleDeleteClick = rowData => {
    console.log(rowData);
    this.refs.modalDelete.handleShow(rowData[0], rowData[6]);
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
        }
      }
    });

  render() {
    const columns = [
      {
        name: "name",
        label: "Name",
        options: {
          filter: false,
          sort: true,
          setCellHeaderProps: value => ({ style: { textAlign: "center" } })
        }
      },
      {
        name: "category",
        label: "Category",
        options: {
          sort: true,
          searchable: false,
          setCellHeaderProps: value => ({ style: { textAlign: "center" } }),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <p
                style={{
                  margin: "0",
                  borderRadius: "15px",
                  borderLeft: "2px solid " + value.color,
                  paddingLeft: "15px"
                }}
              >
                {value.title}
              </p>
            );
          },
          filter: true,
          filterType: "custom",
          filterOptions: {
            logic: (item, filters) => {
              if (filters.length) return !filters.includes(item.title);
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
                                onClick={event => {
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
            }
          }
        }
      },
      {
        name: "date",
        label: "Date",
        options: {
          filter: false,
          sort: false,
          searchable: false,
          setCellHeaderProps: value => ({ style: { textAlign: "center" } }),
          customBodyRender: (value, tableMeta, updateValue) => {
            var mm = value.getMonth() + 1;
            var dd = value.getDate();
            var yyyy = value.getFullYear();

            var res = [
              (mm > 9 ? "" : "0") + mm,
              (dd > 9 ? "" : "0") + dd,
              yyyy
            ].join("/");

            return <p className="text-center mb-0">{res}</p>;
          }
        }
      },
      {
        name: "type",
        label: "Type",
        options: {
          sort: false,
          searchable: false,
          setCellHeaderProps: value => ({ style: { textAlign: "center" } }),
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
                        onChange={event => {
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
            }
          }
        }
      },
      {
        name: "value",
        label: "Value",
        options: {
          filter: false,
          sort: false,
          searchable: false,
          setCellHeaderProps: value => ({ style: { textAlign: "center" } }),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <p className="text-center mb-0" style={{ minWidth: "80px" }}>
                  <span className="font-weight-bold">Rp </span>
                  {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </React.Fragment>
            );
          }
        }
      },
      {
        name: "account",
        options: {
          display: false,
          filter: false
        }
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
    return (
      <React.Fragment>
        <ModalBox ref="modalEdit" modalTitle="Edit Transaction" />
        <ModalDelete ref="modalDelete" modalTitle="Delete Transaction" />
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            title={"Transaction Data"}
            data={this.props.data}
            columns={columns}
            options={options}
            className="px-3 shadow"
          />
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default DataTable;
