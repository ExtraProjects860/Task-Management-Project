const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class User extends Model {}

User.init({

});

module.exports = User;