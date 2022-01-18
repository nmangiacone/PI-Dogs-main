import React from "react";
import "./Card.css";

export default function Card({ image, name, temperaments, weightMin, weightMax }) {
    return (
        <div className="card">
            <h2 className="dogName">{name}</h2>
            <img className="cardImg" src={image} alt="none" width='250px' heigth='200px'/>
            <h4 className="dogTemp">{temperaments?.map((el) => {
                 return <p key={el.name}>{el.name}</p>;
            })}</h4>
            <h4 className="cardWeight"> WeightMin: {weightMin} kg </h4>
            <h4 className="cardWeight"> WeightMax: {weightMax} kg </h4>          
        </div>
    )
}