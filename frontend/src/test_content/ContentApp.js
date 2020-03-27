import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Models from "./model/Models"

function ContentApp() {
  return (
        <React.Fragment>
            <div className="my-4">
                <h2 className="text-center">Welcome to test content</h2>
            </div>
            <Models />
        </React.Fragment>
    );
}

export default ContentApp;