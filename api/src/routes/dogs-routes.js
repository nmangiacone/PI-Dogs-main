const { Router } = require("express");
const router = Router();
const { getAllDogs } = require("../controllers/dogControllers");
const { getAllInfo } = require("../routes/utils");

router.get("/", async (req, res, next) => {
    const name = req.query.name;
    try {
      const dataDogs = await getAllDogs();
      
      if (name) {
        const nameDog = dataDogs.filter((e) =>
          e.name.toLowerCase().includes(name.toLowerCase())
        );
        
        nameDog.length
          ? res.status(200).send(nameDog)
          : res.status(404).send("Dog with this name not found");
      } else {
        const dataDogs = await getAllDogs();
       
        res.status(200).json(dataDogs);
      }
    } catch (error) {
      next(error);
    }
  });

router.get("/:id", async function(req, res, next) {
    try {
        const id = req.params.id;
        const dogTotal = await getAllInfo();   
        if (id){
        let dogId = await dogTotal.filter(el => el.id == id)
        dogId.length?
        res.status(200).send(dogId) :
        res.status(404).send("Dog not found")
        }
    } catch (error) {
        next(error)
    };
});


module.exports = router;