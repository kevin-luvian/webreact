import React, { Component } from "react";
import AccountCard from "./AccountCard";

const cards = [
  {
    id: "card-menu-1",
    title: "cash",
    icon: "fa fa-dollar",
    color: "#1cc88a",
    total: 30000
  },
  {
    id: "card-menu-2",
    title: "bank",
    icon: "fa fa-credit-card",
    color: "#007bff",
    total: 500000
  }
];

class AccountCardCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createSlideIndicators = () => {
    let result = [];
    cards.map((props, index) =>
      result.push(
        <li
          key={index}
          data-target="#carouselExampleIndicators"
          data-slide-to={index}
          className={index === 0 ? "active" : ""}
          style={{ backgroundColor: "gray" }}
        />
      )
    );
    return result;
  };

  createCards = () => {
    let result = [];
    cards.map((props, index) =>
      result.push(
        <div
          key={index}
          className={
            index === 0 ? "carousel-item p-4 active" : "carousel-item p-4"
          }
        >
          <AccountCard id={"card-account-" + index} {...props} />
        </div>
      )
    );
    return result;
  };

  render() {
    return (
      <React.Fragment>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
          data-interval="false"
        >
          <ol
            className="carousel-indicators"
            style={{ transform: "translateY(100%)" }}
          >
            {this.createSlideIndicators()}
          </ol>
          <div className="carousel-inner">{this.createCards()}</div>
          <a
            className="carousel-control-prev my-auto ml-4"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
            style={{
              height: "80px",
              width: "30px",
              transform: "translateX(200px)"
            }}
          >
            <i
              className="fa fa-caret-left text-gray-800"
              style={{ fontSize: "80px" }}
            />
          </a>
          <a
            className="carousel-control-next my-auto mr-4"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
            style={{
              height: "80px",
              width: "30px",
              transform: "translateX(-200px)"
            }}
          >
            <i
              className="fa fa-caret-right text-gray-800"
              style={{ fontSize: "80px" }}
            />
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default AccountCardCarousel;
