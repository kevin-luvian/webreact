import React,{Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModelForm from "./ModelForm";
import axios from "../axios/Axios";

class Model extends Component{
    constructor(props){
        super(props)
        this.state={
            showForm: false
        }
    }

    deleteHandler = async() => {
        await axios.delete("/model/"+this.props.id)
        this.props.load()
    }

    handleForm = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    handleResult = async(result) => {
        /*
        const display = result
        display["id"] = this.props.id
        console.log(display)
        */
        const uri = "/model/"+this.props.id
        await axios.put(uri, result)
        this.props.load()
    }

    render(){
        return(
            <React.Fragment>
                {this.state.showForm && 
                <ModelForm 
                    showForm={this.handleForm.bind(this)}
                    result={this.handleResult.bind(this)}
                    title={"Change Model"+this.props.id}
                    judul={this.props.judul}
                    deskripsi={this.props.deskripsi}
                    jumlah={this.props.jumlah}
                />
                }
                <div className="card text-white bg-info mb-3">
                    <div className="card-header">
                        <div className="float-left">
                            <p className="mb-0">Model-{this.props.id}</p>
                        </div>
                        <div className="float-right">
                            <p className="text-right mb-0">jumlah: {this.props.jumlah}</p>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="card-body pb-0">
                        <h5 className="card-title">{this.props.judul}</h5>
                        <p className="card-text"></p>
                        <p className="card-text">{this.props.deskripsi}</p>
                        <div className="row pb-1">
                            <button onClick={this.handleForm} className="col-6 btn btn-dark">change</button>
                            <button onClick={this.deleteHandler} className="col-6 btn btn-danger">delete</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Model;