import React from 'react';
import Card from './Card';

function CardArea() {
    const cards = [
        {
            id : "card-menu-1",
            title : "cash",
            icon : "fa fa-dollar",
            color : "#1cc88a",
            total : 30000
        },{
            id : "card-menu-2",
            title : "bank",
            icon : "fa fa-credit-card",
            color : "#007bff",
            total : 500000
        }
    ]

    const createCards = () => {
        let result = [];
        cards.map((props, index) => (
            result.push(<Card key={index} id={"card-account-"+index} {...props}/>)
        ))
        return result
    }

    return (
        <React.Fragment>
            <div className="row">
                {createCards()}
            </div>
        </React.Fragment>
    );
}

export default CardArea;