import React from "react";
import Driver from '../assets/driver.jpg'
import Passenger from '../assets/passenger.png'
import { useRoutes, Link } from 'react-router-dom'

const Card = (props) => {
    return (
        
        <div className = {`Card ${props.license ? 'potential-driver' : 'no-driver'}`}>
                <div className = "ImageLink">
                    <img 
                    className = "icons"
                    src={props.seat=='driver' ? Driver : Passenger}
                    alt={`Passenger Icon`}
                />
                    
                </div>
                <div className="passenger-info">
                    <h5>{post.title}</h5>
                    <p>{post.content}</p>
                    <strong>Destination: </strong> <span>{props.destination}</span> <br/>
                    <strong> Preferred Arrival Time: </strong> <span>{props.arrival}</span> <br />
                    <strong> Has driver's license: </strong> <span>{props.license? "Yes": "No"}</span> <br />
                    <Link to={`/view/${props.id}`} state={{ passenger: props }} key={props.id}>More...</Link>
                    
                </div>
                
        </div>

    )
}
export default Card;