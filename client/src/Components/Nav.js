import React from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = ({
  setCurrentPage,
  filterByTemperament,
  temperament,
  sort,
  refresh,
  filterCreated,
}) => {
  return (
    <div className="divNav">
      
      <div>
      <button className='elementNB' onClick={refresh}>Refresh</button>
      </div>
      <div className="content-select">
      <select onChange={(e) => filterByTemperament(e)}>
        <option value="DEFAULT" disabled>
          Temperaments
        </option>
        <option value="all">All</option>
        {temperament?.map((temp) => {
          return (
            <option
              key={temp.name}
              value={temp.name}
            >{temp.name}</option>
          );
        })}
        :
      </select>
      
      <select onChange={(e) => sort(e)}>
        <option value="DEFAULT" disabled>
          Order By
        </option>
        <option value="alf-asc">A - Z</option>
        <option value="alf-des">Z - A</option>
        <option value="weightMin-asc">WeightMin +</option>
        <option value="weightMin-des">WeightMin -</option>
        <option value="weightMax-asc">WeightMax +</option>
        <option value="weightMax-des">WeightMax -</option>
      </select>
     
      <select onChange={(e) => filterCreated(e)}>
        <option value="DEFAULT" disabled>
          Created/Exist
        </option>
        <option value="all">All</option>
        <option value="number">Exist</option>
        <option value="string">Created</option>
      </select>
      </div> 
      <div>
      <Link to="/create">
        <button className='elementNB'>Create Dog</button>
      </Link>
      </div>
      <div>
      <Link to="/">
        <button className='elementNB'>Back</button>
      </Link>
      </div>
      <div>
      <SearchBar setCurrentPage={setCurrentPage} />
      </div>
      
    </div>
  );
};

export default Nav;