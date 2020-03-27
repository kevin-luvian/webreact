import React, {Component} from "react";

class ChooseWeek extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <label className="col-12 col-md-2 my-auto">select week</label>
                    <div className="col-4 col-md-3">
                        <select
                            className="custom-select custom-select-sm form-control"
                            name="dataTable_length" 
                            aria-controls="dataTable"
                        >
                            <option value="">-</option>
                            <option value="10">January</option>
                            <option value="10">February</option>
                            <option value="25">March</option>
                            <option value="50">April</option>
                            <option value="100">May</option>
                            <option value="100">June</option>
                            <option value="100">July</option>
                            <option value="100">August</option>
                            <option value="100">September</option>
                            <option value="100">October</option>
                            <option value="100">November</option>
                            <option value="100">December</option>
                        </select>
                    </div>
                    <div className="col-4 col-md-2">
                        <select
                            className="custom-select custom-select-sm form-control"
                            name="dataTable_length" 
                            aria-controls="dataTable"
                        >
                            <option value="10">All</option>
                            <option value="10">Food</option>
                            <option value="25">Beverage</option>
                            <option value="50">Utility</option>
                            <option value="100">Snack</option>
                        </select>
                    </div>
                    <div className="col-4 col-md-3">
                        <select
                            className="custom-select custom-select-sm form-control"
                            name="dataTable_length" 
                            aria-controls="dataTable"
                        >
                            <option value="">-</option>
                            <option value="10">January</option>
                            <option value="10">February</option>
                            <option value="25">March</option>
                            <option value="50">April</option>
                            <option value="100">May</option>
                            <option value="100">June</option>
                            <option value="100">July</option>
                            <option value="100">August</option>
                            <option value="100">September</option>
                            <option value="100">October</option>
                            <option value="100">November</option>
                            <option value="100">December</option>
                        </select>
                    </div>
                    <button className="col-11 col-md-2 mx-auto btn btn-primary mt-phone2-2 " type="button">change</button>
                </div>
            </div>
        )
    }
}

export default ChooseWeek;