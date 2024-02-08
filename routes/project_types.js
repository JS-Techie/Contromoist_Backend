const projectTypeRouter = require("express").Router()

const {authenticate} = require("../middleware")

const{projectTypeController} = require("../controllers")

projectTypeRouter.route("/").get(projectTypeController.fetchAll)
projectTypeRouter.route("/:id").get(projectTypeController.fetchById)
projectTypeRouter.route("/").post(projectTypeController.create)
projectTypeRouter.route("/:id").patch(projectTypeController.edit)
projectTypeRouter.route("/:id").delete(projectTypeController.delete)

module.exports = projectTypeRouter