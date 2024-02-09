const {Sequelize} = require("sequelize")
const {db} = require("../utils")

db.Users = require("./users")(db.sequelize,Sequelize)
db.Travel = require("./t_travel")(db.sequelize,Sequelize)
db.TravelDetails = require("./t_travel_details")(db.sequelize,Sequelize)
db.QualityTemplateTask = require("./t_template_task")(db.sequelize,Sequelize)
db.QualityTemplate = require("./t_quality_template")(db.sequelize,Sequelize)
db.Quality = require("./t_quality")(db.sequelize,Sequelize)
db.Project = require("./t_project")(db.sequelize,Sequelize)
db.ProjectResource = require("./t_project_resource")(db.sequelize,Sequelize)
db.ProjectType = require("./t_project_types")(db.sequelize,Sequelize)
db.ProjectFiles = require("./t_project_files")(db.sequelize,Sequelize)
db.ProjectTasks = require("./t_project_task")(db.sequelize,Sequelize)
db.ProjectStatus = require("./t_project_status")(db.sequelize,Sequelize)
db.ProjectTemplate = require("./t_project_template")(db.sequelize,Sequelize)


module.exports = db