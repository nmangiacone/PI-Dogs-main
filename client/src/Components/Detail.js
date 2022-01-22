import React from "react";
import { useEffect }  from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDogsById } from "../Actions";
import "./Detail.css";
import img from "../Img/spinner.gif";


export default function Detail (props) {
    console.log(props)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDogsById(props.match.params.id))
    }, [dispatch, props.match.params.id])
    
    const myDog = useSelector((state) => state.detail)

return (
    <div className='divDetail'> 
        <div>
        { 
        myDog.length > 0 ?
        <div className='asd'> 
         <h1 className='name'>{myDog[0].name} </h1> 
         <img src = {myDog[0].image} alt="Img not found" className='image'/> 
         <h5  className='caracts'> Temperaments: {myDog[0].temperaments?.map((el) => {
                 return <p key={el.name}>{el.name}</p>;
         })}</h5>  
         <p className='caracts'> HeightMin: {myDog[0].heightMin} Cm</p>
         <p className='caracts'> HeightMax: {myDog[0].heightMax} Cm</p>  
         <p className='caracts'> WeightMin: {myDog[0].weightMin} Kg</p>
         <p className='caracts'> WeightMax: {myDog[0].weightMax} Kg</p> 
         <p className='caracts'> Life span: {myDog[0].life_span}</p>
        </div> : <div className="imgSpinner"><img src={img} alt="loading"/></div>                                                          
    }
     </div>
     <div>
        <Link to="/home"><button  className='buttonHome1'> Back </button></Link>
    </div>   
    </div>
)
}
