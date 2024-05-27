const Sequelize = require('sequelize');
const Users = require('../apps/models/Users');

const models = [Users];
const databaseConfig = require('../configs/db.js');

class Database {
   constructor(){
    this.init();

    }

    init(){
    this.connection = new Sequelize(databaseConfig)

    models.map((model) => model.init(this.conection));
    }
}

module.exports = new Database();