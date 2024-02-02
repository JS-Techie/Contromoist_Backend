const {Sequelize} = require("sequelize")
const {db} = require("../utils")

db.Travel = require("./t_travel")(db.sequelize,Sequelize)
db.TravelDetails = require("./t_travel_details")(db.sequelize,Sequelize)
db.ProjectResource = require("./t_project_resource")(db.sequelize,Sequelize)


module.exports = db