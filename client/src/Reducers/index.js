import {
    GET_ALL_DOGS,
    GET_DOGS_BY_NAME,
    GET_DOGS_DETAIL,
    POST_DOG,
    GET_TEMPERAMENTS,
    FILTER_BY_TEMPERAMENT,
    ORDER_BY,
    CREATED_OR_EXIST,
    CLEAR_DETAILS_STATE,
  } from "../Actions";
  
  const initialState = {
    dogs: [],
    allDogs: [],
    temperament: [],
    detail: [],
  };
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case GET_ALL_DOGS:
        return {
          ...state,
          dogs: action.payload,
          allDogs: action.payload,
          loader: false,
        };
      case GET_DOGS_BY_NAME:
        return {
          ...state,
          dogs: action.payload,
          loader: false,
        };
  
      case GET_DOGS_DETAIL:
        return {
          ...state,
          detail: action.payload,
          loader: false,
        };
  
      case POST_DOG:
        return {
          ...state,
        };
      case GET_TEMPERAMENTS:
        return {
          ...state,
          temperament: action.payload,
          loader: false,
        };
  
      case FILTER_BY_TEMPERAMENT:
        let allDogs = state.allDogs;
        let typeFiltered =
          action.payload === "all"
            ? allDogs
            : //: allDogs.filter((el) => el.types === action.payload);
              allDogs.filter((d) => d.temperaments?.find(e=>e.name===action.payload));
        return {
          ...state,
          dogs: typeFiltered,
        };
      case ORDER_BY:
        let sortDogs;
        if (action.payload === "alf-asc") {
          sortDogs = state.dogs.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          });
        }
        if (action.payload === "alf-des") {
          sortDogs = state.dogs.sort(function (a, b) {
            if (a.name > b.name) {
              return -1;
            }
            if (a.name < b.name) {
              return 1;
            }
            return 0;
          });
        }
        if (action.payload === "weightMin-asc") {
          sortDogs = state.dogs.sort(function (a, b) {
            if (a.weightMin > b.weightMin) {
              return -1;
            }
            if (a.weightMin < b.weightMin) {
              return 1;
            }
            return 0;
          });
        }
        if (action.payload === "weightMin-des") {
          sortDogs = state.dogs.sort(function (a, b) {
            if (a.weightMin > b.weightMin) {
              return 1;
            }
            if (a.weightMin < b.weightMin) {
              return -1;
            }
            return 0;
          });
        }
        if (action.payload === "weightMax-asc") {
          sortDogs = state.dogs.sort(function (a, b) {
            if (a.weightMax > b.weightMax) {
              return -1;
            }
            if (a.weightMax < b.weightMax) {
              return 1;
            }
            return 0;
          });
        }
        if (action.payload === "weightMax-des") {
          sortDogs = state.dogs.sort(function (a, b) {
            if (a.weightMax > b.weightMax) {
              return 1;
            }
            if (a.weightMax < b.weightMax) {
              return -1;
            }
            return 0;
          });
        }
        return {
          ...state,
          dogs: sortDogs,
        };
      case CREATED_OR_EXIST: {
        const allD = state.allDogs;
        const filterCreated =
          action.payload === "all"
            ? allD
            : allD.filter((d) => typeof d.id === action.payload);
        return { ...state, dogs: filterCreated };
      }
  
     
      case CLEAR_DETAILS_STATE:
        return {
          ...state,
          detail: [],
        };
  
      default:
        return state;
    }
  }
  
  export default rootReducer;