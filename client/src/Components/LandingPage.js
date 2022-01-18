import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
  <div className="landingpage">
    <div className="bkg">     
    <h1  className="title">The Dog Api</h1>
    <div className="buttonPosition">
    <Link to ="/home">
        <button className="button">Lets Go In!</button>
    </Link>
    </div>
    </div>
  </div> 
)
};

export default LandingPage;
