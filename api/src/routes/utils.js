const axios = require("axios");
const { Dog, Temperament } = require("../db.js");
require('dotenv').config();
const{ API_KEY } = process.env 

const getApiInfo = async () => {
    const dogApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    let apiInfo = await dogApi.data.map((dog) => { 
        return {
            id: dog.id,
            name: dog.name,
            heightMin: Number(dog.height.metric.split(' - ')[0]) ,
            heightMax: Number(dog.height.metric.split(' - ')[1]),
            weightMin: Number(dog.weight.metric.split(' - ')[0] !== "NaN" ?
                    dog.weight.metric.split(' - ')[0] :
                    dog.weight.metric.split(' - ')[1]),
            weightMax: Number(dog.weight.metric.split(' - ')[1]),
            life_span: dog.life_span,
            image: dog.image.url,
            temperaments: dog.temperament?.split(", ").map(el => {return {name:  el}
            })
        };
    });
    return apiInfo;
};

const getDbInfo = async () => {
    return await Dog.findAll({            
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllInfo = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo;
}

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllInfo
    
  };