import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import "./Home.css";
import img from "../Img/spinner.gif";
import {
  getAllDogs,
  getTemperaments,
  filterByTemperament,
  orderBy,
  filterByCreatedOrExist,
} from "../Actions";
import Card from "./Card";
import Paged from "./Paged";
import Nav from "./Nav";

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const temperament = useSelector((state) => state.temperament);
  const [, setOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  let dogsPerPage = 8;
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(
    indexOfFirstDog,
    indexOfLastDog
  ); 
  console.log(currentDogs);
  const paginado = (page) => {
    setCurrentPage(page);
    console.log("Cambio de pagina");
  };

  useEffect(() => { 
    dispatch(getAllDogs()) 
  }, [dispatch]) 

  useEffect(() => {
    dispatch(getTemperaments())
  }, [dispatch])

  function handleFilterTemperament(e) {
    e.preventDefault();
    dispatch(filterByTemperament(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterByCreatedOrExist(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderBy(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllDogs());
    dispatch(getTemperaments());
    //dispatch(trueLoader());
  }



  return (
    <div className="home">
      <Nav
      temperament={temperament}
        filterByTemperament={handleFilterTemperament}
        sort={handleSort}
        refresh={handleClick}
        filterCreated={handleFilterCreated}
        setCurrentPage={setCurrentPage}
        />
        <div>
          <Paged
            dogsPerPage={dogsPerPage}
            allDogs={allDogs}
            currentPage={currentPage}
            paginado={paginado}
          />
          
           <div className='cardContainer'>
                {
                  currentDogs.length > 0 ?
                        currentDogs?.map((el) => {
                        return (
                            <div key={el.id} className='cardHome'>
                                <Link to={'/dogs/' + el.id} style={{ textDecoration: 'none' }} >
                                    <Card
                                        key={el.id}
                                        name={el.name}
                                        image={el.image}
                                        weightMin={el.weightMin}
                                        weightMax={el.weightMax}
                                        temperaments={el.temperaments}
                                        createdInDB={el.createdInDB}
                                    />
                                </Link>
                            </div>
                        )
                    })
                  : <div className="imgSpinner"><img src={img} alt="loading"/></div>
                  }
            </div>
        </div>
      </div>
  );
};

export default Home;
