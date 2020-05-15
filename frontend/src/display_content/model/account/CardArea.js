import React, { Component } from "react";
import axios from "../../../backend/axios/Axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import Card from "./Card";

class CardArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      data: []
    };
  }

  componentDidMount() {
    this.fetchAccountCalculated();
  }

  fetchAccountCalculated = async () => {
    await axios
      .get("/api/account/all/calculated")
      .then(response => {
        this.setState({ isLoading: false, data: response.data.payload });
      })
      .catch(error => {
        console.log(error);
      });
  };

  createCards = () => {
    let result = [];
    this.state.data.map((props, index) =>
      result.push(<Card key={index} id={"card-account-" + index} {...props} />)
    );
    return result;
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <div className="card shadow mt-4" style={{ minHeight: "108px" }}>
            <div className="center mx-auto">
              <ScaleLoader color={"#8914fe"} height={40} width={5} margin={5} />
            </div>
          </div>
        ) : (
          <div className="row">{this.createCards()}</div>
        )}
      </React.Fragment>
    );
  }
}

export default CardArea;
