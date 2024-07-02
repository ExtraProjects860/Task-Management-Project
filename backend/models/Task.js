const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class Task extends Model {}

Task.init({

});

module.exports = Task;