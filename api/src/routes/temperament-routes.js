const axios = require("axios");
const { Router } = require("express");
const router = Router();
const { Temperament } = require("../db.js");
const { getAllInfo } = require("./utils.js");
const{ API_KEY } = process.env 
require('dotenv').config();

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