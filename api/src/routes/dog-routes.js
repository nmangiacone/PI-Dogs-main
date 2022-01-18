const { Router } = require("express");
const router = Router();
const { Dog, Temperament } = require("../db");

router.post('/', async (req, res, next) => {
    const { name, heightMin, heightMax, weightMin, weightMax, life_span, image, temperament } = req.body;
    try {
        let dogCreated = await Dog.create({
            name,
            heightMin,
            heightMax,
            weightMin,
            weightMax,
            life_span,
            image      
        });
        let temperamentDB = await Temperament.findAll({
            where: {
                name: temperament,
            }
        });
        console.log(dogCreated)
        console.log(temperamentDB)
        console.log(temperament)
        await dogCreated.addTemperament(temperamentDB);
        res.status(200).send('Dog created successfully')
    } catch (error) {
        next(error)
    };
});
  
  
  module.exports = router;