import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/ModalStyle.css'

class ModelForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUpdated: false,
            judul: "",
            deskripsi: "",
            jumlah: "0"
        };
    }

    componentDidMount() {
        this.setState({
            judul:this.props.judul,
            deskripsi:this.props.deskripsi,
            jumlah:this.props.jumlah,
            isUpdated:true
        })
    }

    showMethod = () => {
        this.props.showForm();
    }

    changeHandler = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    saveHandler = () => {
        const result = {
            judul:this.state.judul,
            deskripsi:this.state.deskripsi,
            jumlah:this.state.jumlah
        }
        this.props.result(result)
        this.showMethod()
    }

    render() {
        return (
            <React.Fragment>
                <div className="modal d-block" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-dark">
                                <h5 className="modal-title text-white">{this.props.title}</h5>
                                <button type="button" className="close" aria-label="Close" onClick={this.showMethod}>
                                    <span className="text-white" aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form className="px-3 text-dark">
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Judul</label>
                                        <div className="col-sm-10">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Judul"
                                                name="judul"
                                                onChange={this.changeHandler}
                                                value={this.state.judul}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Deskripsi</label>
                                        <div className="col-sm-10">
                                            <textarea
                                                className="form-control" 
                                                placeholder="Deskripsi"
                                                name="deskripsi"
                                                onChange={this.changeHandler}
                                                value={this.state.deskripsi}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Jumlah</label>
                                        <div className="col-sm-10">
                                            <input
                                                type="number" 
                                                className="form-control" 
                                                placeholder="Jumlah"
                                                name="jumlah"
                                                onChange={this.changeHandler}
                                                value={this.state.jumlah}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-warning text-white" onClick={this.showMethod}>Close</button>
                                <button type="button" className="btn btn-success" onClick={this.saveHandler}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ModelForm;