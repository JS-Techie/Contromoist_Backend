const qualityRouter = require("express").Router()

// const {authenticate} = require("../middleware")
const {qualityController} = require("../../controllers")


qualityRouter.route("/").get(qualityController.getAllTasks)
qualityRouter.route("/:id").get(qualityController.getTaskById)
qualityRouter.route("/").post(qualityController.createTask)
qualityRouter.route("/:id").patch(qualityController.editTask)
qualityRouter.route("/:id").delete(qualityController.deleteTask)
qualityRouter.route("/:project").get(qualityController.getTasksByProjectId)

module.exports = qualityRouter