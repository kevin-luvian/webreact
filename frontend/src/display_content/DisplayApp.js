import React, { Component } from "react";
import Loader from "react-spinners/DotLoader";
import MenuRouter from "../backend/router/MenuRouter";

class DisplayApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount = async () => {
    await new Promise(r => setTimeout(r, 20));
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <div className="col">
            <div className="row">
              <div
                className="mx-auto"
                style={{ transform: "translateY(42vh)" }}
              >
                <Loader color={"#007bff"} size={100} />
              </div>
            </div>
          </div>
        ) : (
          <MenuRouter />
        )}
      </React.Fragment>
    );
  }
}

export default DisplayApp;
