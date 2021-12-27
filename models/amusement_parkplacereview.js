'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Amusement_parkPlaceReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Amusement_parkPlaceReview.init({
    id_place: DataTypes.INTEGER,
    author_name: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    time: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Amusement_parkPlaceReview',
  });
  return Amusement_parkPlaceReview;
};