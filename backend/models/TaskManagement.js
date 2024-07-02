const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class TaskManagement extends Model {}

TaskManagement.init({
    
});

module.exports = TaskManagement;