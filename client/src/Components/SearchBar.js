import { React, useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../Actions";
import "./SearchBar.css";

const SearchBar = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const [dogName, setDogName] = useState("");
  const [error, setError] = useState(true);

  function handleInputChange(e) {
    e.preventDefault();
    setDogName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogsByName(dogName.trim()));
    setCurrentPage(1);
    setDogName("");
    e.target.reset();
  }

  useEffect(() => {
    if (dogName.length < 3) {
      setError(true);
    } else {
      setError(false);
    }
  }, [dogName, setError]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          className='input'
          placeholder="Search..."
          type="text"
          value={dogName}
          onChange={(e) => handleInputChange(e)}
        ></input>
        <button disabled={error} className='fetch' type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;