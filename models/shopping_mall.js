'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shopping_mall extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Shopping_mall.init({
    name: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    photo_reference: DataTypes.STRING,
    html_attribution: DataTypes.STRING,
    height: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    vicinity: DataTypes.STRING,
    url: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    load: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Shopping_mall',
  });
  return Shopping_mall;
};