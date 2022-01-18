import axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME";
export const GET_DOGS_DETAIL = "GET_DOGS_DETAIL";
export const POST_DOG = "POST_DOG";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const ORDER_BY = "ORDER_BY";
export const CREATED_OR_EXIST = "CREATED_OR_EXIST";
export const CLEAR_DETAILS_STATE = "CLEAR_DETAILS_STATE";

export function getAllDogs() {
  return async function (dispatch) {
    try {
      const dog = await axios("http://localhost:3001/dogs");
      return dispatch({
        type: GET_ALL_DOGS,
        payload: dog.data,
      });
    } catch (error) {
      console.log("No se encontraron los dogs actions");
    }
  };
}

export function getDogsByName(payload) {
  return async function (dispatch) {
    try {
      const dog = await axios.get(
        "http://localhost:3001/dogs?name=" + payload
      );
      dispatch({
        type: "GET_DOGS_BY_NAME",
        payload: dog.data,
      });
    } catch (err) {
      console.log(err);
      alert("Wrong dog name");
    }
    
  };
}

export function getDogsById(payload) {
  return async function (dispatch) {
    try {
      const dog = await axios.get(
        "http://localhost:3001/dogs/" + payload
      );
      dispatch({
        type: "GET_DOGS_DETAIL",
        payload: dog.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function postDog(newDog) {
  return async function (dispatch) {
    try {
      const dog = await axios.post(
        "http://localhost:3001/dog/",
        newDog
      );
      console.log(dog);

      return dispatch({
        type: "POST_DOG",
        payload: dog,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    try {
      const temperament = await axios("http://localhost:3001/temperament");
      return dispatch({
        type: "GET_TEMPERAMENTS",
        payload: temperament.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function filterByTemperament(temperament) {
  return {
    type: "FILTER_BY_TEMPERAMENT",
    payload: temperament,
  };
}

export function orderBy(payload) {
  return async function (dispatch) {
    dispatch({
      type: "ORDER_BY",
      payload,
    });
  };
}

export function filterByCreatedOrExist(payload) {
  console.log(`mira aca ${payload}`);
  return async function (dispatch) {
    dispatch({
      type: "CREATED_OR_EXIST",
      payload,
    });
  };
}


export function clearDetailsState() {
  return {
    type: "CLEAR_DETAILS_STATE",
  };
}