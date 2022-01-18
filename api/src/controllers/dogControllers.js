const {
    getApiInfo,
    getDbInfo,
} = require("../routes/utils");



const getAllDogs = async (name) => {
    try {
      const [api, db] = await Promise.all([getApiInfo(), getDbInfo()]);
      const allDogs = [...db, ...api];
      if (name) {
        let prueba = await dogFilterByName(allDogs, name);
        return prueba;
      }
      return allDogs;
    } catch (err) {
      next(err);
    }
  };


module.exports = {
    getAllDogs
 };