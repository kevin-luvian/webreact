import { Component } from "react";
import { connect } from "react-redux";
import ClearStoreAction from "../../../backend/redux/actions/ClearStoreAction";

class Logout extends Component {
  componentDidMount() {
    this.props.ClearStoreAction();
    this.props.history.push("/login");
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  ClearStoreAction: () => dispatch(ClearStoreAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
