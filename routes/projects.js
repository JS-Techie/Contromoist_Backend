const projectRouter = require("express").Router()

const {authenticate} = require("../middleware")

const{projectController} = require("../controllers")

projectRouter.route("/").get(projectController.fetchAll)
projectRouter.route("/:id").get(projectController.fetchById)
projectRouter.route("/").post(projectController.create)
projectRouter.route("/:id").patch(projectController.edit)
projectRouter.route("/:id").delete(projectController.delete)

module.exports = projectRouter