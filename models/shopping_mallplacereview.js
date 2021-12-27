'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shopping_mallPlaceReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Shopping_mallPlaceReview.init({
    id_place: DataTypes.INTEGER,
    author_name: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    time: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Shopping_mallPlaceReview',
  });
  return Shopping_mallPlaceReview;
};