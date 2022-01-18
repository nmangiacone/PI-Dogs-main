const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING, 
    },
    image: {
      type: DataTypes.STRING,
    },
    weightMin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weightMax: {
      type: DataTypes.STRING,
      allowNull: false
    },  
    heightMin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    heightMax: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
};