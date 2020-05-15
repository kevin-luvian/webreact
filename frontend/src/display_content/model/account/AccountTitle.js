import React, { Component } from "react";

const data = {
  title: "BNI Bank"
};

class AccountTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.generateDate();
  }

  generateDate = () => {
    var date = new Date();
    for (var i = 0; i < 10; i++) {
      var newDate = new Date();
      newDate.setTime(newDate.getTime() + i * 86400000);
      console.log(newDate);
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-12">
          <div className="card shadow h-100 py-2">
            <div className="card-body">
              <h4 className="header-title">{data.title}</h4>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AccountTitle;
