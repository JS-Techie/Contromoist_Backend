const projectStatusRouter = require("express").Router()

const {authenticate} = require("../middleware")

const{projectStatusController} = require("../controllers")

projectStatusRouter.route("/").get(projectStatusController.fetchAll)
projectStatusRouter.route("/:id").get(projectStatusController.fetchById)
projectStatusRouter.route("/").post(projectStatusController.create)
projectStatusRouter.route("/:id").patch(projectStatusController.edit)
projectStatusRouter.route("/:id").delete(projectStatusController.delete)

module.exports = projectStatusRouter