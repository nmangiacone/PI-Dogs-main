const axios = require("axios");
const { Router } = require("express");
const router = Router();
const { Temperament } = require("../db.js");
const { getAllInfo } = require("./utils.js");
const{ API_KEY } = process.env 
require('dotenv').config();

// router.get('/', async (req, res, next) => {
//     try{
//     let infoApi = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
//     let tempsRepeated = infoApi.data.map(el => el.temperament).toString();
//     tempsRepeated = await tempsRepeated.split(',');
//     const tempsConEspacio = await tempsRepeated.map(el => {
//         if (el[0] == ' ') {
//             return el.split('');
//         }
//         return el;
//     });
//     const tempsSinEspacio = await tempsConEspacio.map(el => {
//         if (Array.isArray(el)) {
//             el.shift();
//             return el.join('');
//         }
//         return el;
//     })

//     await tempsSinEspacio.forEach(el => {
//         if (el != '') {
//             Temperament.findOrCreate({
//                 where: {
//                     name: el
//                 },
//             });
//         }
//     });
//     const allTemps = await Temperament.findAll();
//     res.status(200).send(allTemps);
//     } catch (error) {
//         next(error);
//     }
// });

router.get('/', async (req, res, next) => {
    const doGsapi= await getAllInfo();
    const temperamentsDog = doGsapi.map((el)=>el.temperaments);
    
    const all = {};
    temperamentsDog.forEach((list) => {
        list?.forEach((e) => { all[e.name] = true });
    });
    console.log(all)
    const alltemperaments = Object.keys(all).sort();
  
    alltemperaments.forEach((e) => {
        Temperament.findOrCreate({
            where: { name : e }
        });
    });

    const atempent = await Temperament.findAll();
    res.send(atempent);
});

module.exports = router;