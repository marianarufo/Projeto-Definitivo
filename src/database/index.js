const Sequelize = require('sequelize');

const databaseConfig = require('../configs/db.js');

class Database {
   constructor(){
    this.init();

    }

    init(){
    this.connection = new Sequelize(databaseConfig)

    }
}

module.exports = new Database();