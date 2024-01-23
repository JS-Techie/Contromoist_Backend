
const { Sequelize } = require('sequelize');
const {dbConfig} = require("../config")

const sequelize = new Sequelize(dbConfig.development);

const setupDB = () => {

    sequelize
    .authenticate()
    .then(() => {
      console.log('Connection to the database has been established successfully.');
    })
    .catch((error) => {
      console.error('Unable to connect to the database:', error);
    });
}


module.exports = setupDB