const {Sequelize} = require("sequelize")
const {db} = require("../utils")

db.Travel = require("./t_travel")(db.sequelize,Sequelize)

module.exports = db