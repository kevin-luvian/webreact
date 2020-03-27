import React, {Component} from 'react'
import { connect } from "react-redux";
import ClearTokenAction from "../../../backend/redux/actions/ClearTokenAction";
import axios from '../../../backend/axios/Axios'

class Logout extends Component {
    
    componentDidMount() {
        const response = this.handleLogout()
        console.log(response)
        this.props.ClearTokenAction()
    }

    handleLogout = async() => {
        const url = "/logout"
        const token = 'Bearer ' + this.props.token
        return await axios.post(url, null, {
            //crossorigin: true,
            headers: {
                "Authorization": token,
                "Access-Control-Allow-Credentials": "true"
            }
        })
    }
    
    render () {
        return (
            <React.Fragment/>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    ClearTokenAction: () => dispatch(ClearTokenAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);