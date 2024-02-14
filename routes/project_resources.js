const projectResourceRouter = require("express").Router()

const {authenticate} = require("../middleware")

const{projectResourceController} = require("../controllers")

projectResourceRouter.use(authenticate)

projectResourceRouter.route("/").get(projectResourceController.fetchAll)
projectResourceRouter.route("/:id").get(projectResourceController.fetchById)
projectResourceRouter.route("/").post(projectResourceController.create)
projectResourceRouter.route("/:id").patch(projectResourceController.edit)
projectResourceRouter.route("/:id").delete(projectResourceController.delete)

module.exports = projectResourceRouter