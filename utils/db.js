
const { Sequelize } = require('sequelize');
const {dbConfig} = require("../config")
const print = require("./print")

const sequelize = new Sequelize(dbConfig.development);

const setupDB = () => {

    sequelize
    .authenticate()
    .then(() => {
      print('database connected successfully',"SUCCESS");
    })
    .catch((error) => {
      print(`Unable to connect to the database: ${error}`, "ERROR");
    });
}


module.exports = setupDB