import React from "react";
import "./Paged.css";

const Paged = ({ dogsPerPage, allDogs, paginado }) => {
  const pageNumbers = [];
  const top = Math.ceil(allDogs.length / dogsPerPage);
  for (let i = 1; i < top + 1; i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <div className="pagedContainer">
        {pageNumbers?.map((number) => {
          return (
            <span key={number}>
               <p className="btn" onClick={() => paginado(number)}>{number}</p>
            </span>
          );
        })}
      </div>
    </nav>
  );
};

export default Paged;
