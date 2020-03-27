import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Model from "./Model";
import ModelForm from "./ModelForm";
import axios from "../axios/Axios";

class Models extends Component {
    constructor(props){
        super(props);
        this.state = {
            models: [],
            isLoading: true,
            showForm: false
        }
    }

    componentDidMount(){
        this.loadModels();
    }

    loadModels = async() => {
        const fetchedModels = [];
        const response = await axios.get("/model/all");
        for (let key in response.data){
            fetchedModels.push({
                ...response.data[key]
            })
        }
        this.setState({
            models:fetchedModels
        })
    }

    handleForm = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    handleResult = async(result) => {
        //console.log(result)
        await axios.post("/model", result)
        await this.loadModels()
    }

    render() {
        return (
            <React.Fragment>
                {this.state.showForm && 
                <ModelForm 
                    showForm={this.handleForm.bind(this)}
                    result={this.handleResult.bind(this)}
                    title="Add Model"
                    judul=""
                    deskripsi=""
                    jumlah="0"
                />
                }
                <div className="container">
                    <div className="text-center">
                        <h4>All Models</h4>
                        <button onClick={this.handleForm} className="my-3 col-12 btn btn-primary">add model</button>
                    </div>
                    <div>
                        {this.state.models.map((model, index) => {
                            return (
                                <Model 
                                    key={index}
                                    id={model.id}
                                    judul={model.judul}
                                    deskripsi={model.deskripsi}
                                    jumlah={model.jumlah}
                                    load={this.loadModels.bind(this)}
                                />
                            )
                        })}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Models;