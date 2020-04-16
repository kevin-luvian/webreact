import React, { Component } from "react";
import AccountCard from "./AccountCard";
import Carousel from "react-bootstrap/Carousel";
import axios from "../../../backend/axios/Axios";
//import ScaleLoader from "react-spinners/ScaleLoader";

class AccountCardCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      activeIndex: 0,
      data: [],
    };
  }

  componentDidMount() {
    this.fetchAccountCalculated();
  }

  fetchAccountCalculated = async () => {
    await axios
      .get("/api/account/all/calculated")
      .then((response) => {
        this.setState({ isLoading: false, data: response.data.payload });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /*
  createCards = () => {
    let result = [];
    cards.map((props, index) =>
      result.push(
        <Carousel.Item>
          <AccountCard id={"card-account-" + index} {...props} />
        </Carousel.Item>
      )
    );
    return result;
  };
*/
  handleSelect = (selectedIndex, e) => {
    console.log(e);
  };

  render() {
    const iconStyle = {
      color: "grey",
      fontSize: "3rem",
    };
    return (
      <React.Fragment>
        <Carousel
          className="col-12 col-md-9 col-lg-7 col-xl-6 mx-auto"
          indicators={false}
          prevIcon={<i className="fa fa-chevron-left" style={iconStyle} />}
          nextIcon={<i className="fa fa-chevron-right" style={iconStyle} />}
        >
          {this.state.data.map((props, index) => {
            return (
              <Carousel.Item key={index} className="py-4">
                <AccountCard id={"card-account-" + index} {...props} />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </React.Fragment>
    );
  }
}

export default AccountCardCarousel;
