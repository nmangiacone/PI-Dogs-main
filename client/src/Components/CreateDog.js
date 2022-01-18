import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments, getAllDogs } from "../Actions/index";
import { useHistory, Link } from "react-router-dom";
import "./CreateDog.css";

const CreateDog = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const temperament = useSelector((state) => state.temperament);
  const [error, ] = useState();
  const [input, setInput] = useState({
    name: "", 
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
    image: "",
    temperament: [],
    
  });
  
  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(getAllDogs());
    // eslint-disable-next-line
  }, []);


  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }


  function handleSelect(e) {
    if (!input.temperament.includes(e.target.value)) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        });
        console.log(input);
    }
}

  function handleSubmit(e) {
    e.preventDefault();

    const { name, weightMin, weightMax, heightMin, heightMax, life_span } = input;
    if(name === "" || name.length < 3) {return alert("Name is invalid");
    } 
    else if (
      heightMin > heightMax || heightMin === "" || heightMax === ""
    ) {
      setInput({
        ...input,
        heightMin: "",
        heightMax: "",
      });
      return alert(
        "Height is undefined or minimum height is greater than the maximun height"
      );
    } else if (
      weightMin > weightMax ||  weightMin === "" ||  weightMax === ""
    ) {
      setInput({
        ...input,
        weightMin: "",
        weightMax: "", 
      })
      return alert(
        "Weight is undefined or minimum weight is greater than the maximun weight"
      );
    } else if (life_span < 1 || life_span > 50) {return alert("Life span cant be less than 1 or greater than 50");
    } 
  

    dispatch(postDog(input));
    alert("Dog Created");
    setInput({
        name: "", 
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        life_span: "",
        image: "",
        temperament: [],
    });
    history.push("/home");
  }
  console.log(input.temperament)
  return (
    <div className='divCreate'>
      <Link to="/home">
        <button className='createButton'>Back</button>
      </Link>
      <h1 className='titleCreate'>Create your Dog</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
        <label className="labelCreate"><strong>Name: </strong></label>
        <input
          className="inputCreate"
          value={input.name}
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e) => handleChange(e)}
        ></input>
        </div>
        <div>
        <label className="labelCreate"><strong>Minimum Height (cm): </strong></label>
        <input
          className="inputCreate"
          value={input.heightMin}
          type="number"
          name="heightMin"
          placeholder="HeightMin"
          onChange={(e) => handleChange(e)}
        ></input>
        </div>
        <div>
        <label className="labelCreate"><strong>Maximum Height (cm): </strong></label>
        <input
          className="inputCreate"
          value={input.heightMax}
          type="number"
          name="heightMax"
          placeholder="HeightMax"
          onChange={(e) => handleChange(e)}
        ></input>
        </div>
        <div>
        <label className="labelCreate"><strong>Minimum Weight (kg): </strong></label>
        <input
          className="inputCreate"
          value={input.weightMin}
          type="number"
          name="weightMin"
          placeholder="WeightMin"
          onChange={(e) => handleChange(e)}
        ></input>
        </div>
        <div>
        <label className="labelCreate"><strong>Maximum Weight (kg): </strong></label>
        <input
          className="inputCreate"
          value={input.weightMax}
          type="number"
          name="weightMax"
          placeholder="WeightMax"
          onChange={(e) => handleChange(e)}
        ></input>
        </div>
        <div>
        <label className="labelCreate"><strong>Life Span (years): </strong></label>
        <input
          className="inputCreate"
          value={input.life_span}
          type="number"
          name="life_span"
          placeholder="Life Span"
          onChange={(e) => handleChange(e)}
        ></input>
        </div>
        <div>
        <label className="labelCreate"><strong>URL Image: </strong></label>
        <input
          className="inputCreate"
          value={input.image}
          type="text"
          name="image"
          placeholder="URL Image"
          onChange={(e) => handleChange(e)}
        ></input>
        </div>
        <div>
        <select className="selectCreate" onChange={e => handleSelect(e)} >
                        <option value='selected' hidden >Temperaments</option>
                        {temperament?.sort(function (a, b) {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                        }).map(temp => {
                            return (
                                <option value={temp.name} key={temp.id}>{temp.name}</option>
                            )
                        })}
                    </select>
                    {input.temperament.map(el => {
                        return (
                            
                                <ul className='allTemps' key={el}>
                                    <li>
                                        <p className='temp'><strong>{el}</strong></p>
                                    </li>
                                </ul>
                            
                        )
                    })}
        </div>
       
        <button disabled={error} className='createButton'>Create</button>
      </form>
    </div>
  );
};

export default CreateDog;
