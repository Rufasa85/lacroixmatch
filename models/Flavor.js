const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Flavor extends Model {}

Flavor.init({
    // add properites here, ex:
    name: {
         type: DataTypes.STRING,
         allowNull:false,
         unique:true
    },
    pic: {
         type: DataTypes.STRING,
         allowNull:false,
         unique:true
    }
},{
    sequelize
});

module.exports=Flavor